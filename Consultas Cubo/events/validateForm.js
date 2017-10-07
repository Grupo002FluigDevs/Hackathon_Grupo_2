function validateForm(form)
{
	if(form.getValue("txtCodConsulta") == "")
	{
		throw "Necessário informar o código da consulta."
	}
	
	if(form.getValue("txtConsulta") == "")
	{
		throw "Necessário informar a consulta."
	}
	
	if(form.getValue("cmbJNDI") == "")
	{
		throw "Necessário informar o datasource."
	}	
	
    var dsResult = DatasetFactory.getDataset("dsSQL", new Array(form.getValue("txtConsulta"), form.getValue("cmbJNDI")), null, null);
    
    log.info("RESULT=>"+dsResult.getValue(0, "RESULTADO"));
    
    if(dsResult.getValue(0, "RESULTADO") == "ERRO")
    {    	
    	throw "Ops, ocorreu um erro na consulta:\n"+ dsResult.getValue(0, "MENSAGEM");   
    }
}