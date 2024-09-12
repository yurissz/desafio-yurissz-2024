class RecintosZoo {
    constructor() {

        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];

        this.animais = [
            { especie: "LEAO", tamanho: 3, biomas: ['savana'], carnivoro: true },
            { especie: "LEOPARDO", tamanho: 2, biomas: ['savana'], carnivoro: true },
            { especie: "CROCODILO", tamanho: 3, biomas: ['rio'], carnivoro: true },
            { especie: "MACACO", tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            { especie: "GAZELA", tamanho: 2, biomas: ['savana'], carnivoro: false },
            { especie: "HIPOPOTAMO", tamanho: 4, biomas: ['savana', 'rio', 'savana e rio'], carnivoro: false }
        ];
    }

    analisaRecintos(especie, quantidade) {
        const animal = this.animais.find(animal => animal.especie === especie);
        if (!animal) {
            return { erro: "Animal inválido" };
        }

        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        let recintosViaveis = [];

        this.recintos.forEach(recinto => {
            const espacoOcupado = recinto.animais.reduce((total, animal) => total + (animal.quantidade * this.getTamanhoAnimal(animal.especie)), 0);
            let espacoRestante = recinto.tamanho - espacoOcupado;

            if (!animal.biomas.includes(recinto.bioma)) {
                return;
            }

            const recintoTemCarnivoro = recinto.animais.some(animal => this.isCarnivoro(animal.especie));
            if (animal.carnivoro && recinto.animais.length > 0) {
                return;
            }
            if (recintoTemCarnivoro && !animal.carnivoro) {
                return;
            }

            if (especie === 'MACACO' && recinto.animais.length === 0) {
                return;
            }

            if (especie === 'HIPOPOTAMO' && recinto.animais.length > 0 && recinto.bioma !== 'savana e rio') {
                return;
            }

            let espacoNecessario = quantidade * animal.tamanho;
            if (recinto.animais.length > 0) {
                espacoNecessario += 1;
            }

            if (espacoRestante >= espacoNecessario) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoRestante - espacoNecessario} total: ${recinto.tamanho})`);
            }
        });

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };
    }

    getTamanhoAnimal(especie) {
        const animal = this.animais.find(animal => animal.especie === especie);
        return animal ? animal.tamanho : 0;
    }

    isCarnivoro(especie) {
        const animal = this.animais.find(animal => animal.especie === especie);
        return animal ? animal.carnivoro : false;
    }
}

export { RecintosZoo as RecintosZoo };

const rec = new RecintosZoo()
console.log(rec.analisaRecintos("MACACO", 2));



