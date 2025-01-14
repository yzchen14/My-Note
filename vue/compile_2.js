const fs = require('fs');
const path = require('path');
const compiler = require('vue-template-compiler');

// Define the input and output directories
const componentsDir = path.resolve(__dirname, 'src/components');
const outputDir = path.resolve(__dirname, 'dist');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Function to compile a single .vue file into a .js file
function compileVueToJs(filePath, outputPath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const parsed = compiler.parseComponent(content);

    // Extract template, script, and style
    const template = parsed.template ? parsed.template.content : '';
    const script = parsed.script ? parsed.script.content : '';
    const style = parsed.styles && parsed.styles.length > 0 ? parsed.styles.map(s => s.content).join('\n') : ''; // Handle multiple styles
    const componentName = path.basename(filePath, '.vue'); // Get the name of the component from the file name

    // Escape template and style content to be used in a string
    const templateEscaped = template.trim().replace(/`/g, '\\`');
    const styleEscaped = style.trim().replace(/`/g, '\\`'); // Escape the CSS content for JavaScript

    // Check if the component already defines a mounted method
    const mountedMethodExists = script.includes('mounted()');

    let finalScript;
    if (template) {
        finalScript = script.replace(/export default ?\{/, (match) => {
            return `${match}\n\ttemplate: \`\n${templateEscaped}\`,`; 
        });
    } else {
        finalScript = script; // If no template, use the original script
    }

    // Handle existing script and append style injection in mounted
    if (mountedMethodExists) {
        finalScript = finalScript.replace(/mounted\(\)[^}]*\{/, (match) => {
            return `${match}\n\t\tif (!document.getElementById('style-${componentName}')) {\n\t\t\tconst style = document.createElement('style');\n\t\t\tstyle.id = 'style-${componentName}';\n\t\t\tstyle.innerHTML = \`\n${styleEscaped}\`;\n\t\t\tdocument.head.appendChild(style);\n\t\t}`;
        });
    } else {
        // If no mounted method, add a new one with the style injection
        finalScript = finalScript.replace(/export default ?\{/, (match) => {
            return `${match}\n\tmounted() {\n\t\tif (!document.getElementById('style-${componentName}')) {\n\t\t\tconst style = document.createElement('style');\n\t\t\tstyle.id = 'style-${componentName}';\n\t\t\tstyle.innerHTML = \`\n${styleEscaped}\`;\n\t\t\tdocument.head.appendChild(style);\n\t\t}\n\t},`;
        });
    }

    // Write the compiled .js file
    fs.writeFileSync(outputPath, finalScript, 'utf-8');
    console.log(`Compiled: ${filePath} -> ${outputPath}`);
}

// Read all files in the components directory
fs.readdirSync(componentsDir).forEach((file) => {
    if (file.endsWith('.vue')) {
        const filePath = path.join(componentsDir, file);
        const outputFilePath = path.join(outputDir, `${path.basename(file, '.vue')}.js`);

        // Compile and save each .vue file as .js
        compileVueToJs(filePath, outputFilePath);
    }
});

console.log('All .vue files have been compiled to .js files.');
