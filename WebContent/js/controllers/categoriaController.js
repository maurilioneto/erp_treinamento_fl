app.controller("categoriaController", function ($scope, requisicaoService, filterFilter, orderByFilter) {
	
	$scope.mostrarAguarde = false;
	$scope.tela = "Produto > Categoria";
	$scope.categorias = [];
	$scope.showModalConfirmacao = false;
	$scope.showModalAviso = false;
	$scope.mostrarAguarde = false;
	$scope.visualizaCadastro = false;
	$scope.mensagemModal = '';
	$scope.mensagemRodape = '';
	$scope.mostrarAguarde = true;
	$scope.campoOrdenacao = 'descricao';
	
	//inicia a tela
	atualizarTela();
	
	/*
    /////////////////////////////////////////////////////////////////
	// FUNÇÕES                                                     //
    /////////////////////////////////////////////////////////////////
    */

	$scope.sair = function() {
    	location.href = 'index.html';
    }

	$scope.btnIncluir = function() {
		//mudar tela para cadastro
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal = "";
    	$scope.mostrarAguarde = true;
    	delete $scope.categoria;
    	$scope.mostrarAguarde = false;
    	$scope.visualizaCadastro = true;
    }

	$scope.btnVoltar = function(){
		//mudar tela para cadastro
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal = "";
    	$scope.mostrarAguarde = true;
    	delete $scope.categoria;
    	$scope.mostrarAguarde = true;
    	$scope.visualizaCadastro = false;
    }

	$scope.btnEditar = function() {
		
		//limpar tela
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.mostrarAguarde = true;
    	
		//validar
    	if (!$scope.objetoSelecionado) {
            $scope.mensagemModal   = "É necessário selecionar o registro que deseja editar!";
        	$scope.showModalAviso  = true;
        	$scope.mostrarAguarde = false;
    		return;
    	}
		//construir parametros
    	var param = {
			int1: $scope.objetoSelecionado.id
		}
    	//obter a categoria
    	requisicaoService.requisitarPOST("categoria/obterPorId", param , function(retorno) {
			if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
			$scope.categoria = retorno.data;
	    	$scope.mostrarAguarde = false;
	        $scope.visualizaCadastro = true;
		});
    }

	$scope.btnExcluir = function(){
    	//limpar tela
		$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	//validar
		if (!$scope.objetoSelecionado) {
            $scope.mensagemModal = "É necessário selecionar o registro que deseja excluir!";
        	$('#modalAtencao').modal();
    		return;
    	}
    	$scope.mensagemModal = 'Deseja realmente excluir o registro?';
		$('#modalExcluir').modal();
    }

	$scope.confirmaExcluir = function(){
    	//limpar tela
		$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.mostrarAguarde = true;
    	
		//construir parametros
		var param = {
			int1: $scope.objetoSelecionado.id
		}

    	//deletar
    	requisicaoService.requisitarPOST("categoria/removerPorId", param, function(retorno){
    		if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
    		
    		$scope.mostrarAguarde       = false;
    		$scope.showModalConfirmacao = false;
			$('#modalExcluir').modal('hide');
    		atualizarTela();
    	});
    }

	$scope.retornarPesquisa = function (){
    	$scope.visualizaCadastro = false;
    }

	$scope.btnSalvar = function(pcategoria){
		//limpar tela
    	$scope.mensagemRodape = "";
    	$scope.mostrarAguarde = true;
    	
		console.log(pcategoria)
		//validação
    	if (!pcategoria){
    		$scope.mensagemRodape = "É necessário o preenchimento do campo Descrição!";
    		document.getElementById("cDescricao").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	if (!pcategoria.descricao) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Descrição!";
    		document.getElementById("cDescricao").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
		if (!pcategoria.tipo) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Tipo!";
    		document.getElementById("cTipo").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }

		//salvar
    	requisicaoService.requisitarPOST("categoria/salvar", pcategoria, function(retorno){
    		if (!retorno.isValid) {
    			$scope.mensagemRodape = retorno.msg;
    			$scope.mostrarAguarde = false;
        		return;
    		}
    		
    		$scope.mostrarAguarde    = false;
    		$scope.visualizaCadastro = false;
    		atualizarTela();
    	});
    }

	/*
    /////////////////////////////////////////////////////////////////
	// PAGINAÇÃO E TABELA                                          //
    /////////////////////////////////////////////////////////////////
    */

	function atualizarTela(){
		//limpa tela
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.mostrarAguarde = true;
    	
		//obter todos os registros
    	requisicaoService.requisitarGET("categoria/obterTodos", function(retorno) {
    		if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
			$scope.categoriaes = retorno.data;
			//refaz dados da paginação
			$scope.listagem          = [10, 50, 100, 200];
		    $scope.objetoSelecionado = null;
		    $scope.viewby       	 = 10;
			$scope.currentPage  	 = 1;
			$scope.itemsPerPage 	 = $scope.viewby;
			$scope.maxSize 			 = 5; //Number of pager buttons to show
			$scope.pesquisar();
			$scope.mostrarAguarde = false;
		});
    	$scope.mostrarAguarde = false;
	}
	
	$scope.pesquisar = function(){
		$scope.categoriaFiltradas = orderByFilter(filterFilter($scope.categoriaes,{
			id:$scope.idFilter,
			descricao: $scope.descricaoFilter,
			tipo: $scope.tipoFilter
		}), $scope.campoOrdenacao);
	}
	
	
    $scope.selecionarLinha = function(objeto) {
       $scope.objetoSelecionado = objeto;
    }

	$scope.ordenacao = function (pcampo) {
		
		if ($scope.campoOrdenacao == '+'+pcampo || $scope.campoOrdenacao == '-'+pcampo) {
    		$scope.reverseOrdenacao = !$scope.reverseOrdenacao;
    	} else {
    		$scope.reverseOrdenacao = false;
    	}
    	
    	if ($scope.reverseOrdenacao) {
    		$scope.campoOrdenacao   = '-'+pcampo;	
    	} else {
    		$scope.campoOrdenacao   = '+'+pcampo;
    	}
    	
    	$scope.pesquisar();
    }

})