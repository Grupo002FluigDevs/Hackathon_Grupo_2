$(document).ready(function(){
	
	$("#btnValidaConsulta").on('click', function(){
		
		if(valida_form())
		{						    
		    var dsResult = DatasetFactory.getDataset("dsSQL", new Array($("#txtConsulta").val(), $("#cmbJNDI").val()), null, null);
		    
		    if(typeof(dsResult.values[0].RESULTADO) !== "undefined" && 
		    		dsResult.values[0].RESULTADO === "ERRO")
		    {
		    	FLUIGC.message.error({
		    	    title: 'Erro',
		    	    message: 'Ops, ocorreu um erro na consulta!',
		    	    details: dsResult.values[0].MENSAGEM
		    	}, function(el, ev) {});
		    	
		    	return false;
		    }else{
		    	
		    	FLUIGC.message.alert({
				    message: 'Consulta validada com sucesso.',
				    title: 'Message',
				    label: 'OK'
				}, function(el, ev) {});
		    	
		    	console.log(dsResult);	
		    }		    		    
		}
		
	});
	
});

function valida_form()
{
	if($("#txtConsulta").val() == "")
	{
		FLUIGC.message.alert({
		    message: 'Necessário informar a consulta',
		    title: 'Message',
		    label: 'OK'
		}, function(el, ev) {});
		
		alert("");
		return false;
	}
	
	if($("#cmbJNDI").val() == "")
	{
		FLUIGC.message.alert({
		    message: 'Necessário informar o datasource.',
		    title: 'Message',
		    label: 'OK'
		}, function(el, ev) {});
		return false;
	}
	
	return true;
}