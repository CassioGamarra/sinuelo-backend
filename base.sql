SELECT *
FROM pg_catalog.pg_tables
WHERE schemaname != 'pg_catalog' AND
    schemaname = 'fazenda_esperanca';

ALTER DATABASE NOME_BASE SET DATESTYLE  TO 'ISO, DMY';

CREATE SCHEMA SINUELO; 

CREATE TABLE sinuelo.clientes (
	id_cliente serial NOT NULL,
	nome varchar(200) NOT NULL,
	caminho varchar(200) NOT NULL,
	nome_schema varchar(200) NOT NULL,
	ativo bool NOT NULL,
	PRIMARY KEY (id_cliente)
);
 
CREATE TABLE sinuelo.usuarios (
		id_usuario serial NOT NULL,
		id_cliente integer not null,
		nome varchar(200) NOT NULL,
		usuario varchar(200) NOT NULL,
		senha varchar(200) NOT NULL,
		email varchar(200) NOT NULL,
		ativo bool NULL,
		foreign key(id_cliente) references sinuelo.clientes(id_cliente) on update cascade on delete restrict,
		PRIMARY KEY (id_usuario)
	); 

INSERT INTO sinuelo.clientes (nome, caminho, nome_schema, ativo) values ('Fazenda Esperança', 'MV9mYXplbmRhX2VzcGVyYW5jYQ==', 'fazenda_esperanca', true);
insert into sinuelo.usuarios(id_cliente, nome, usuario, senha, email,  ativo) values (1,'Administrador', 'administrador', '$2a$10$9ftk4n0HapIKGIIkvY7BxeqBiiPSgZl7g7w/FnkCdS2LGmS8n1OT6', 'cassiogamarra@outlook.com', true);
  
CREATE SCHEMA FAZENDA_ESPERANCA

	CREATE TABLE doencas (
		id_doenca serial NOT NULL,
		descricao varchar(200) NOT NULL,
		PRIMARY KEY (id_doenca)
	)

	CREATE TABLE fazendas (
		id_fazenda serial NOT NULL,
		nome varchar(200) NOT NULL,
		cep varchar(8) NULL,
		cidade varchar(200) NULL,
		estado varchar(2) NULL,
		PRIMARY KEY (id_fazenda)
	)

	CREATE TABLE medicamentos (
		id_medicamento serial NOT NULL,
		descricao varchar(200) NOT NULL,
		modo_uso varchar(500) NULL,
		PRIMARY KEY (id_medicamento)
	)

	CREATE TABLE racas (
		id_raca serial NOT NULL,
		nome varchar(200) NOT NULL,
		PRIMARY KEY (id_raca)
	)

	CREATE TABLE alertas (
		id_alerta serial NOT NULL,
		descricao varchar(30) NOT NULL,
		PRIMARY KEY (id_alerta)
	)

	CREATE TABLE funcionarios (
		id_funcionario serial NOT NULL,
		nome varchar(200) NOT NULL,
		usuario varchar(200) NOT NULL,
		senha varchar(200) NOT NULL,
		email varchar(200) NOT NULL,
		nivel int2 NOT NULL,
		ativo bool NULL,
		PRIMARY KEY (id_funcionario)
	)

	CREATE TABLE vacinas (
		id_vacina serial NOT NULL,
		descricao varchar(200) NOT NULL,
		ind_obrigatorio bpchar(1) NOT NULL DEFAULT 'N'::bpchar,
		modo_uso varchar(500) NULL,
		detalhes varchar(500) NULL,
		PRIMARY KEY (id_vacina)
	)

	CREATE TABLE piquetes (
		id_piquete serial NOT NULL,
		id_fazenda int4 NOT NULL,
		nome varchar(200) NOT NULL,
		capacidade int4 NOT NULL,
		PRIMARY KEY (id_piquete),
		FOREIGN KEY (id_fazenda) REFERENCES fazendas(id_fazenda) ON DELETE RESTRICT ON UPDATE CASCADE
	)

	CREATE TABLE animais (
		id_animal serial NOT NULL,
		id_fazenda int4 NOT NULL,
		id_piquete int4 NULL,
		id_raca int4 NOT NULL,
		nome varchar(200) NOT NULL,
		sexo bpchar(1) NOT NULL,
		data_nascimento date NOT NULL,
		nome_pai varchar(200) NULL,
		nome_mae varchar(200) NULL,
		peso numeric(10, 2) NOT NULL,
		pelagem varchar(200) NULL,
		PRIMARY KEY (id_animal),
		FOREIGN KEY (id_fazenda) REFERENCES fazendas(id_fazenda) ON DELETE RESTRICT ON UPDATE CASCADE,
		FOREIGN KEY (id_piquete) REFERENCES piquetes(id_piquete) ON DELETE RESTRICT ON UPDATE CASCADE,
		FOREIGN KEY (id_raca) REFERENCES racas(id_raca) ON DELETE RESTRICT ON UPDATE CASCADE
	)

	CREATE TABLE brincos (
		id_brinco serial NOT NULL,
		id_animal int4 NULL,
		cod_rfid varchar(100) NULL,
		cod_visual varchar(100) NULL,
		PRIMARY KEY (id_brinco),
		FOREIGN KEY (id_animal) REFERENCES animais(id_animal) ON DELETE RESTRICT ON UPDATE CASCADE
	)

	CREATE TABLE historico_doencas (
		id_historico_doenca serial NOT NULL,
		id_funcionario int4 NOT NULL,
		id_animal int4 NOT NULL,
		id_doenca int4 NOT NULL,
		observacao varchar(500) NULL,
		data date NULL DEFAULT CURRENT_DATE,
		hora time NULL DEFAULT CURRENT_TIME,
		PRIMARY KEY (id_historico_doenca),
		FOREIGN KEY (id_animal) REFERENCES animais(id_animal) ON DELETE RESTRICT ON UPDATE CASCADE,
		FOREIGN KEY (id_doenca) REFERENCES doencas(id_doenca) ON DELETE RESTRICT ON UPDATE CASCADE,
		FOREIGN KEY (id_funcionario) REFERENCES funcionarios(id_funcionario) ON DELETE RESTRICT ON UPDATE CASCADE
	)

	CREATE TABLE historico_medicamentos (
		id_historico_medicamento serial NOT NULL,
		id_funcionario int4 NOT NULL,
		id_animal int4 NOT NULL,
		id_medicamento int4 NOT NULL,
		observacao varchar(500) NULL,
		data date NULL DEFAULT CURRENT_DATE,
		hora time NULL DEFAULT CURRENT_TIME,
		PRIMARY KEY (id_historico_medicamento),
		FOREIGN KEY (id_animal) REFERENCES animais(id_animal) ON DELETE RESTRICT ON UPDATE CASCADE,
		FOREIGN KEY (id_medicamento) REFERENCES medicamentos(id_medicamento) ON DELETE RESTRICT ON UPDATE CASCADE,
		FOREIGN KEY (id_funcionario) REFERENCES funcionarios(id_funcionario) ON DELETE RESTRICT ON UPDATE CASCADE
	)


	CREATE TABLE historico_pesagens (
		id_historico_pesagem serial NOT NULL,
		id_funcionario int4 NOT NULL,
		id_animal int4 NOT NULL,
		peso numeric(10, 2) NOT NULL,
		observacao varchar(500) NULL,
		data date NULL DEFAULT CURRENT_DATE,
		hora time NULL DEFAULT CURRENT_TIME,
		PRIMARY KEY (id_historico_pesagem),
		FOREIGN KEY (id_animal) REFERENCES animais(id_animal) ON DELETE RESTRICT ON UPDATE CASCADE,
		FOREIGN KEY (id_funcionario) REFERENCES funcionarios(id_funcionario) ON DELETE RESTRICT ON UPDATE CASCADE
	)


	CREATE TABLE historico_vacinas (
		id_historico_vacina serial NOT NULL,
		id_funcionario int4 NOT NULL,
		id_animal int4 NOT NULL,
		id_vacina int4 NOT NULL,
		observacao varchar(500) NULL,
		data date NULL DEFAULT CURRENT_DATE,
		hora time NULL DEFAULT CURRENT_TIME,
		PRIMARY KEY (id_historico_vacina),
		FOREIGN KEY (id_animal) REFERENCES animais(id_animal) ON DELETE RESTRICT ON UPDATE CASCADE,
		FOREIGN KEY (id_funcionario) REFERENCES funcionarios(id_funcionario) ON DELETE RESTRICT ON UPDATE CASCADE,
		FOREIGN KEY (id_vacina) REFERENCES vacinas(id_vacina) ON DELETE RESTRICT ON UPDATE CASCADE
	)


	CREATE TABLE historico_alertas (
		id_historico_alertas serial NOT NULL,
		id_funcionario int4 NOT NULL,
		id_animal int4 NOT NULL,
		id_alerta int4 NOT NULL,
		data date NULL DEFAULT CURRENT_DATE,
		hora time NULL DEFAULT CURRENT_TIME,
		PRIMARY KEY (id_historico_alertas),
		FOREIGN KEY (id_animal) REFERENCES animais(id_animal) ON DELETE RESTRICT ON UPDATE CASCADE,
		FOREIGN KEY (id_alerta) REFERENCES alertas(id_alerta) ON DELETE RESTRICT ON UPDATE CASCADE,
		FOREIGN KEY (id_funcionario) REFERENCES funcionarios(id_funcionario) ON DELETE RESTRICT ON UPDATE CASCADE
	);

select * from fazenda_esperanca.funcionarios;
select * from fazenda_esperanca.historico_pesagens;
select * from fazenda_esperanca.historico_medicamentos;
select * from fazenda_esperanca.historico_vacinas;
select * from fazenda_esperanca.historico_doencas;