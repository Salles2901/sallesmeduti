// Índice central de todos os capítulos
import { evolucao } from "./cap01-evolucao.js";
import { procedimentos } from "./cap02-procedimentos.js";
import { profilaxias } from "./cap03-profilaxias.js";
import { vasoativas } from "./cap04-vasoativas.js";
import { sedoanalgesia } from "./cap05-sedoanalgesia.js";
import { bloqueadores } from "./cap06-bloqueadores.js";
import { outrasInfusoes } from "./cap07-outras-infusoes.js";
import { sri } from "./cap08-sri.js";
import { ventilacao } from "./cap09-ventilacao.js";
import { eletrolitos } from "./cap10-eletrolitos.js";
import { hemoderivados } from "./cap11-hemoderivados.js";
import { heparinizacao } from "./cap12-heparinizacao.js";
import { glicemia, delirium, morteEncefalica } from "./cap13-15.js";
import { antimicrobianos } from "./cap16-antimicrobianos.js";
import { empirica } from "./cap17-empirica.js";
import { vancocinemia, formulas, opioides, corticoides } from "./cap18-21.js";

export const capitulos = [
  evolucao,
  procedimentos,
  profilaxias,
  vasoativas,
  sedoanalgesia,
  bloqueadores,
  outrasInfusoes,
  sri,
  ventilacao,
  eletrolitos,
  hemoderivados,
  heparinizacao,
  glicemia,
  delirium,
  morteEncefalica,
  antimicrobianos,
  empirica,
  vancocinemia,
  formulas,
  opioides,
  corticoides
];

export const capitulosById = Object.fromEntries(capitulos.map(c => [c.id, c]));
