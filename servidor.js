import express from "express";
import session from "express-session";
import cors from "cors";
import pool from "./conexao.js";
import path from "path";

import { fileURLToPath } from "url";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "chave-secreta",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// Pasta pública (acesso livre)
app.use("/publico", express.static(path.join(__dirname, "publico")));

function verificarLogin(req, res, next) {
  if (req.session.logado) {
    next();
  } else {
    // Se não estiver logado, redireciona para a página de login
    res.redirect("/publico/login.html");
  }
}

app.use(
  "/privado",
  verificarLogin,
  express.static(path.join(__dirname, "privado"))
);

// Página inicial
app.get("/", (req, res) => {
  res.redirect("/publico/index.html");
});

// Endpoint de logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/publico/login.html");
  });
});

//Endpoints do login
app.post("/login", (req, res) => {
  const { usuario, senha } = req.body;
  pool.query(
    "SELECT * FROM tb_usuarios WHERE usuario=$1 AND senha=$2",
    [usuario, senha],
    (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erro ao consultar o banco de dados" });
      }
      if (results.rows.length > 0) {
        req.session.logado = true;
        res.redirect("/privado/area.html");
      } else {
        res.redirect("/publico/login.html?erro=1");
      }
    }
  );
});

app.get('/produtos', verificarLogin, (req, res)=>{
    pool.query('SELECT * FROM vw_tudo',(erro, resultados)=>{
        if(erro){res.json("Falha ao consultar. "+erro)}
        res.json(resultados.rows)
    })
})

app.get('/categorias', verificarLogin, (req, res) =>{
    pool.query('SELECT * FROM tb_categorias', (erro, resultados)=>{
        if(erro){res.json("Falha ao consultar categorias. "+erro)}
        res.json(resultados.rows)
    })
})

app.post('/produtos', verificarLogin, (req, res)=>{
    const {nome_produto, preco, estoque, fk_id_categoria} = req.body;
    pool.query('INSERT INTO tb_produtos (nome_produto, preco, estoque,      fk_id_categoria) VALUES ($1, $2, $3, $4)', 
    [nome_produto, preco, estoque, fk_id_categoria], (erro, resultado)=>{
        if(erro){res.json("Falha ao cadastrar!"+erro)}
        res.redirect('/privado/area.html?msg=1')
    })
})

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
