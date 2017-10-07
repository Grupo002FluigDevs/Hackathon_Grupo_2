var HelloWorld = SuperWidget.extend({
	
	url: WCMAPI.serverURL,
	jsonCubo: null,
	cardLayout: "108",
    init: function () {    	    
    	
    	google.load("visualization", "1", {packages:["corechart", "charteditor"]});
    	
    	this.createCombo();

    },
    
    getDados: function( dataset )
    {
    	jQuery.ajaxSetup({async:false});
    	
    	var result = null;
    	
    	$.get(this.url+"/api/public/ecm/dataset/search?datasetId="+dataset, function(data){
    		result = data.content;
        });
    	
    	return result;
    	
    },
    
    saveCube: function(){
    	
    	var _that = this;

    	// Component construction by setting one div.
    	var myLoading1 = FLUIGC.loading(window, {
    												textMessage: '<h1>Carregando...</h1>'
    											});
    	// We can show the message of loading
    	myLoading1.show();
    	
    	var config = $("#output").data("pivotUIOptions");
        var config_copy = JSON.parse(JSON.stringify(config));
        //delete some values which will not serialize to JSON
        delete config_copy["aggregators"];
        delete config_copy["renderers"];
        
        var options = JSON.stringify(config_copy);
        var dados = [];
        
    	$.get(this.url+"/ecm/api/rest/ecm/cardPublisher/newItem/"+ this.cardLayout +"/4", 
    	function( model ){
    		
    		dados = model;
    		
    		dados.cardFormData = [
    		                      {name: "txtCodConsulta", value: $("#cmbConsulta").val()},
    		                      {name: "txtCodLayout", value: $("#txtLayout").val()},
    		                      {name: "txtConfiguracao", value: options}    		                      
    		                      ];
    		
    		WCMAPI.Create({
    			url: _that.url+"/ecm/api/rest/ecm/cardPublisher/saveNewCardItem",
    			data: dados,
    			async: true,
    			success:function funcao(data){
    				
    				FLUIGC.message.alert({
    				    message: 'Layout salvo com sucesso.',
    				    title: 'Menssagem',
    				    label: 'OK'
    				}, function(el, ev) {});
    				
    				myLoading1.hide();
    			},
    			error:function funcao(data){
    				WCMAPI.failHandler(data);
    				myLoading1.hide();
    				return false;
    			}
    		})
    		
    	});    	
        
    },
    createCombo: function(){
    	
    	var data = this.getDados("dsConsultasCubo");
    	
    	console.log( data );
    	
    	$("#cmbConsulta").append("<option value=''>Selecione...</option>");
    	for(var i = 0; i < data.length; i++)
    	{
    		$("#cmbConsulta").append("<option value='"+ data[i].txtCodConsulta +"'>"+ data[i].txtCodConsulta +"</option>");
    	}
    	
    },
    
    createCubo: function( data ){    	
    	var _that = this;    	
    	
    	var derivers = $.pivotUtilities.derivers;

        var renderers = $.extend(
            $.pivotUtilities.renderers, 
            $.pivotUtilities.c3_renderers, 
            $.pivotUtilities.d3_renderers,
            $.pivotUtilities.gchart_renderers,
            $.pivotUtilities.export_renderers
            );    	
    	
        _that.jsonCubo = data;
        
    	$("#output").pivotUI(data,{renderers: renderers},false,"br");
    },
    updateCube: function(){
    	
    	var _that = this;
    	
    	$("#output").empty();
    	$("#txtLayout").val("");
    	// Component construction by setting one div.
    	var myLoading1 = FLUIGC.loading(window, {
    												textMessage: '<h1>Carregando...</h1>'
    											});
    	// We can show the message of loading
    	myLoading1.show();
    	    	
    	if($("#cmbConsulta").val() !== ""){
    		
    		$.ajax({
    			method : "GET",
    			url : this.url+"/api/public/ecm/dataset/search?datasetId=dsExecutaConsultaCubo&filterFields=CODCONSULTA,"+$("#cmbConsulta").val(),
    			contentType : "application/json",
    			async : true,
    			error : function(x, e) {
    				if (x.status == 500) {
    					alert("Erro Interno do Servidor: entre em contato com o Administrador.\n"
    							+ x);
    				}
    			},
    			success : function(model) {
    				_that.createCubo( model.content );
    				
    				_that.getLayouts( $("#cmbConsulta").val() );
    				
    		    	// We can hide the message of loading
    		    	myLoading1.hide();
    			}
    		});
    		
    	}    	
    	
    },
    
    getLayouts: function( codconsulta )
    {
    	
    	$("#layouts").empty();
    	$.get(this.url+"/api/public/ecm/dataset/search?datasetId=dsLayoutsCubo&filterFields=txtCodConsulta,"+codconsulta, 
		function( data ){    				
			$.each(data.content, function(indice, objeto){
				
				$("#layouts").append("<option value='"+objeto.txtCodLayout+"'>");
				
			});
		});
    	
    },
    
    updateLayout: function(){
    	
    	var _that = this;
    	
    	$.get(this.url+"/api/public/ecm/dataset/search?datasetId=dsLayoutsCubo&filterFields=txtCodConsulta,"+$("#cmbConsulta").val()+",txtCodLayout,"+$("#txtLayout").val(), 
		function( data ){    				
			$.each(data.content, function(indice, objeto){
				
				$("#output").pivotUI(_that.jsonCubo, JSON.parse(objeto.txtConfiguracao), true);
				
			});
		});
    	
    },

    bindings: {
        local: {
            'save-cube': ['click_saveCube'],
            'update-cube' : ['change_updateCube'],
            'update-layout': ['change_updateLayout']
        }
    }
});