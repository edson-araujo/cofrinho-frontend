const fs = require('fs');
const path = require('path');

// Função para listar a estrutura de diretórios e arquivos recursivamente
function listDir(dir, prefix = '') {
    let result = '';

    const files = fs.readdirSync(dir);
    files.forEach((file, index) => {
        const filePath = path.join(dir, file);
        const isLast = index === files.length - 1;
        const prefixAddition = isLast ? '└── ' : '├── ';
        result += `${prefix}${prefixAddition}${file}\n`;

        if (fs.statSync(filePath).isDirectory()) {
            const newPrefix = prefix + (isLast ? '    ' : '│   ');
            result += listDir(filePath, newPrefix);
        }
    });

    return result;
}

// Caminho base para o seu projeto
const baseDir = process.cwd(); // Diretório atual

// Gerar a estrutura do diretório
const projectStructure = listDir(baseDir);

// Salvar a estrutura em um arquivo
fs.writeFileSync('project-structure.txt', projectStructure);
console.log('A estrutura do projeto foi salva em "project-structure.txt".');
