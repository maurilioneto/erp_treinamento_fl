app.controller("tamanhoController", function ($scope, requisicaoService, filterFilter, orderByFilter) {
	$scope.tela = "Produto > Tamanho";
	$scope.cadastrando = false;
	$scope.editando = false;
	$scope.marcas = [];

	carregarConteudo();
	
	//INCLUIR
	$scope.btnIncluir = function() {
		$scope.tela = "Produto > Tamanho > Incluir";
		$scope.cadastrando = true;
		$scope.cadastro = {};
		$scope.cadastro.status = 1;
		$scope.cadastro.id = null;
	}

	//ALTERAR
	$scope.btnAlterar = function() {
		$scope.tela = "Produto > Tamanho > Incluir";
		$scope.cadastrando = true;
		$scope.cadastro = {};
		$scope.cadastro.status = true;
	}

	//VOLTAR
	$scope.btnVoltar = function() {
		$scope.tela = "Produto > Tamanho";
		$scope.cadastrando = false;
		carregarConteudo();
	}

	//SALVAR
	$scope.btnSalvar = function(tamanho) {
				
		$scope.mensagemRodape = "";

		//VALIDAÇÕES 
		if (!tamanho) {
			$scope.mensagemRodape = "Por favor preencha os campos!";
			document.getElementById("cDescricao").focus();
		}
		if (!tamanho.descricao) {
			$scope.mensagemRodape = "Por favor preencha o campo Descrição!";
			document.getElementById("cDescricao").focus();
		}

		//SALVA O ITEM NA API
		requisicaoService.requisitarPOST("tamanho/salvar", tamanho, function(retorno){
    		if (!retorno.isValid) {
    			alert(retorno.msg);
				return;
    		} else {
				$scope.tela = "Produto > Marca";
				$scope.cadastrando = false;
				$scope.editando = false;
				delete $scope.cadastro;
			}
			carregarConteudo()
    	});

		$scope.tela = "Produto > Tamanho";
		$scope.cadastrando = false;
		$scope.editando = false;
		
		carregarConteudo();
	}
	
	//EDITAR
	$scope.btnEditar = function() {
		//VALIDAÇÕES 	
    	if (!$scope.objetoSelecionado) {
            alert("É necessário selecionar o registro que deseja editar!");
    		return;
    	}
    	var param = {
			int1: $scope.objetoSelecionado.id
		}
    	//OBTER O TAMANHO DA API
    	requisicaoService.requisitarPOST("tamanho/obterPorId", param , function(retorno) {
			if (!retorno.isValid) {
    			alert(retorno.msg);
        		return;
    		}
			$scope.cadastro = retorno.data;
	    	$scope.tela = "Produto > Tamanho > Editar";
			$scope.cadastrando = true;
			$scope.editando = true;
		});
    }

	//EXCLUIR
	$scope.btnExcluir = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	if (!$scope.objetoSelecionado) {
            $scope.mensagemModal  = "É necessário selecionar o registro que deseja excluir!";
        	$('#modalAtencao').modal();
    		return;
    	}

    	if (confirm("Deseja mesmo excluir este registro?")) {
			var param = {
			int1: $scope.objetoSelecionado.id
		}

    	//DELETAR
    	requisicaoService.requisitarPOST("tamanho/removerPorId", param, function(retorno){
	    		if (!retorno.isValid) {
	    			alert(retorno.msg)
	        		return;
	    		}

	    		carregarConteudo();
    		});
		}
    }

	//FILTRAR
	$scope.pesquisar = function(){
		$scope.tamanhosFiltradas = orderByFilter(filterFilter($scope.tamanhos,{
			id:$scope.idFilter,
			descricao: $scope.descricaoFilter,
			tipo: $scope.tipoFilter
		}), $scope.campoOrdenacao);
	}

	//SELECIONAR ITEM DA LISTA
	$scope.selecionarLinha = function(objeto) {
		$scope.objetoSelecionado = objeto;
	}

	//INVERTER|DEFINIR ORDENAÇÃO
	$scope.ordenacao = function (campo) {
		$scope.reverseOrdenacao = ($scope.campoOrdenacao == `+${campo}` || $scope.campoOrdenacao == `-${campo}`) ? !$scope.reverseOrdenacao:false;
    	$scope.campoOrdenacao = ($scope.reverseOrdenacao)?`-${campo}`:`+${campo}`;	
    	$scope.pesquisar();
	}
	
	//RECARREGA LISTA DA API
	function carregarConteudo() {
    	
		//OBTER REGISTROS DA API
    	requisicaoService.requisitarGET("tamanho/obterTodos", function(retorno) {
			console.log(retorno);
    		if (!retorno.isValid) {
				alert("Houve um problema!", retorno.msg);
        		return;
    		}
			$scope.tamanhos = retorno.data;
			$scope.pesquisar();
		});
    
	}
})