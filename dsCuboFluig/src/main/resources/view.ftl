<div id="HelloWorld_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="HelloWorld.instance()">

	<div class="row">
	
		<div class="form-group col-sm-4">
			<label for="cmbConsulta">Consulta</label>
			<select class="form-control" name="cmbConsulta" id="cmbConsulta" data-update-cube></select>
		</div>
	
		<div class="form-group col-sm-4">
			<label for="txtLayout">Layout</label>				
			<input name="txtLayout" id="txtLayout" list="layouts" class="form-control" data-update-layout>
		  	<datalist id="layouts">		    	
		  	</datalist>
		</div>
	
	</div>	
    
    <div class="row">
    	<div id="output" style="margin: 10px;"></div>
    </div>
    
	<button type="button" class="btn btn-info" id="btnSalvar" data-save-cube>Salvar</button>

</div>    

<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
