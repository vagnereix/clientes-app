import { isNull, NULL_EXPR } from "@angular/compiler/src/output/output_ast";

export class Cliente {
    id!: number;
    nome!: string;
    cpf!: string;
    dataCadastro!: string;
}