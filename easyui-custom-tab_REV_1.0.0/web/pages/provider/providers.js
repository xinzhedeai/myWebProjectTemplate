	var dataRows = getData(), dataGrid = undefined;
	$(function() {
		var columns  = [{
			field : 'code',
			title : '供货商编码',
			width :　110,
		},{
			field : 'name',
			title : '供货商名称',
			width :　110,
			sortable : true,
		},{
			field : 'level',
			title : '等级',
			width :　110,
		},{
			field : 'provide',
			title : '主供品类',
			width :　110,
		},{
			field : 'full',
			title : '是否完全',
			width :　110,
		},{
			field : 'issubmit',
			title : '是否提文',
			width :　110,
		},{
			field : 'status',
			title : '审核状态',
			width :　110,
		},{
			field : 'note',
			title : '备注',
			width :　110,
		}],
		options = {
			columns : [columns],
			rownumbers:true,
            singleSelect:false,
            autoRowHeight:false,
            pagination:true,
            fitColumns:true,
            striped:true,
            checkOnSelect:false,
            selectOnCheck:false,
            collapsible:true,
            toolbar:'#tb',
            pageSize:10,
            data : dataRows,
            onRowContextMenu: function(e, index, row) {
				console.info(e);
				e.preventDefault();
				$(this).datagrid('unselectAll');
				$(this).datagrid('selectRow', index);
				$("#menu").menu('show', {
					left: e.pageX,
					top: e.pageY
				});
			}
		};
		dataGrid = $('#dg').datagrid(options);
		
		$('#addProviderBtn').click(function(){
			var rowObj = $.serializeObject($('form', '#myModal'));
			dataRows.push(rowObj);
			dataGrid.datagrid('loadData', dataRows);
			$('#myModal').modal('hide');
		});
	
	});
function getData() {
	var rows = [];
	for(var i = 1; i <= 5; i++) {
		rows.push({
			code: '10695',
			name: '南京天泽星网股份有限公司',
			level: '正式',
			provide: '光纤通信设备配件',
			full: '√',
			issubmit: '√',
			status: '已审核',
			note: '-'
		});
	}
	return rows;
}

function showDialog() {
	/*parent.$('#addModal').show().dialog({
		modal: true,
		closable: true,
		buttons: [{
			text: '添加',
			handler: function() {
				addProvider();
			}
		}, {
			text: '取消',
			handler: function() {
				loginFun();
			}
		}]
	});*/
	$.modalDialog({
			title : '用户授权',
			width : 500,
			height : 300,
			href : 'providers_edit.html',
			buttons : [ {
				text : '授权',
				handler : function() {
					$.modalDialog.openner_dataGrid = dataGrid;//因为授权成功之后，需要刷新这个dataGrid，所以先预定义好
					var f = $.modalDialog.handler.find('#form');
					console.log(f);
					f.submit();
				}
			} ]
		});
}

function addProvider() {
	var formRow = $.serializeObject($('#addModal').find('form'));
	dataRows.unshift(formRow);
	$('#dg').datagrid({
		data: dataRows
	}).datagrid('clientPaging');
}

function deleteFun() {
	//				var row = $('#datagrid').datagrid('getSelected');
	var index = $('#dg').datagrid('getRowIndex', $('#dg').datagrid('getSelected'));
	console.info(index);
	if(index != -1) {
		$('#dg').datagrid('deleteRow', index);
	} else {
		$.messager.alert('提示', '请选择要删除的记录', 'warning');
	}
}

