const fs = require('fs');
const path = require('path');

// Função para criar um diretório se ele não existir
function createDirIfNotExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Diretório criado: ${dirPath}`);
    }
}

// Função para criar um arquivo
function createFile(filePath, content = '') {
    fs.writeFileSync(filePath, content);
    console.log(`Arquivo criado: ${filePath}`);
}

// Função para gerar a arquitetura de um projeto Spring Boot
function generateSpringBootStructure(baseDir) {
    // Criação da estrutura básica de pastas e arquivos do Spring Boot
    const folders = [
        'src/main/java/com/meuprojeto/controller',
        'src/main/java/com/meuprojeto/service',
        'src/main/java/com/meuprojeto/repository',
        'src/main/java/com/meuprojeto/model',
        'src/main/resources',
        'src/main/resources/static',
        'src/main/resources/templates',
        'src/test/java/com/meuprojeto',
    ];

    const files = {
        'src/main/java/com/meuprojeto/MeuProjetoApplication.java': `
            package com.meuprojeto;
            
            import org.springframework.boot.SpringApplication;
            import org.springframework.boot.autoconfigure.SpringBootApplication;

            @SpringBootApplication
            public class MeuProjetoApplication {
                public static void main(String[] args) {
                    SpringApplication.run(MeuProjetoApplication.class, args);
                }
            }
        `,
        'src/main/resources/application.properties': `
            # Configurações do Spring Boot
            spring.datasource.url=jdbc:mysql://localhost:3306/meuprojeto
            spring.datasource.username=root
            spring.datasource.password=
            spring.jpa.hibernate.ddl-auto=update
        `,
        'src/main/java/com/meuprojeto/controller/HelloController.java': `
            package com.meuprojeto.controller;

            import org.springframework.web.bind.annotation.GetMapping;
            import org.springframework.web.bind.annotation.RestController;

            @RestController
            public class HelloController {
                @GetMapping("/hello")
                public String sayHello() {
                    return "Hello, Spring Boot!";
                }
            }
        `,
    };

    // Criar diretórios
    folders.forEach((folder) => createDirIfNotExists(path.join(baseDir, folder)));

    // Criar arquivos
    Object.keys(files).forEach((filePath) => {
        const fullPath = path.join(baseDir, filePath);
        createFile(fullPath, files[filePath]);
    });
}

// Geração do projeto na pasta atual
generateSpringBootStructure(process.cwd());
