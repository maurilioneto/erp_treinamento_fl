app.controller("corController", function ($scope, requisicaoService, filterFilter, orderByFilter) {
		
	$scope.vizualizarCadastro = false;
	$scope.mostrarAguarde = false;
	$scope.tela = "Produto > Cor"	
	
	$scope.cores                = [];
	$scope.showModalConfirmacao = false;
	$scope.showModalAviso       = false;
	$scope.mostrarAguarde       = false;
	$scope.visualizaCadastro 	= false;
	$scope.mensagemModal 	 	= '';
	$scope.mensagemRodape 	 	= '';
	$scope.mostrarAguarde 		= true;
	$scope.campoOrdenacao 		= 'descricao';
	
	atualizarTela();	
	
	/*
    /////////////////////////////////////////////////////////////////
	// FUNÇÕES                                                     //
    /////////////////////////////////////////////////////////////////
    */
    $scope.sair = function(){
    	location.href = 'index.html';
    }

    $scope.btnIncluir = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.mostrarAguarde = true;
    	
    	$scope.cor		       = {};
    	$scope.cor.id       = null;
    	$scope.cor.descricao   = null;
    	$scope.cor.status	   = 1;
    	
    	$scope.mostrarAguarde    = false;
    	$scope.visualizaCadastro = true;
    }

    $scope.btnEditar = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.mostrarAguarde = true;
    	
    	if (!$scope.objetoSelecionado) {
            $scope.mensagemModal   = "É necessário selecionar o registro que deseja editar!";
        	$scope.showModalAviso  = true;
        	$scope.mostrarAguarde = false;
    		return;
    	}
    	var param = {
			int1: $scope.objetoSelecionado.id
		}
    	//obter a cor
    	requisicaoService.requisitarPOST("cor/obterPorId", param , function(retorno) {
			if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
			
			$scope.cor			   = retorno.data;

	    	$scope.mostrarAguarde    = false;
	        $scope.visualizaCadastro = true;
		});
    }

    $scope.btnExcluir = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	if (!$scope.objetoSelecionado) {
            $scope.mensagemModal  = "É necessário selecionar o registro que deseja excluir!";
        	$('#modalAtencao').modal();
    		return;
    	}

    	$scope.mensagemModal        = 'Deseja realmente excluir o registro?';
		$('#modalExcluir').modal();
    }

    $scope.confirmaExcluir = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.mostrarAguarde = true;
    	
		var param = {
			int1: $scope.objetoSelecionado.id
		}

    	//deletar
    	requisicaoService.requisitarPOST("cor/removerPorId", param, function(retorno){
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

    $scope.btnSalvar = function(pcor){
    	$scope.mensagemRodape = "";
    	$scope.mostrarAguarde = true;
    	
    	if (!pcor){
    		$scope.mensagemRodape = "É necessário o preenchimento do campo Descrição!";
    		document.getElementById("cDescricao").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	if (!pcor.descricao) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Descrição!";
    		document.getElementById("cDescricao").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }

    	requisicaoService.requisitarPOST("cor/salvar", pcor, function(retorno){
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
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.mostrarAguarde = true;
    	
		//obter todos os registros
    	requisicaoService.requisitarGET("cor/obterTodos", function(retorno) {
    		if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
			$scope.cores = retorno.data;
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
		$scope.coresFiltradas = orderByFilter(filterFilter($scope.cores,{id:$scope.idFilter,
													                     descricao: $scope.descricaoFilter}), $scope.campoOrdenacao);
		
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
	
    
	
});
