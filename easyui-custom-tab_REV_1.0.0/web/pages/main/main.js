
$(function(){
	$('.sider-nav-s a').click(function(){
		addTab({
				url : $(this).attr('data-href'),
				title : $(this).text(),
			});
	});

});
function addTab(params) {
	var iframe = '<iframe src="' + params.url + '" frameborder="0" style="border:0;width:100%;height:98%;"></iframe>';
	var t = $('#main_tabs');
	var opts = {
		title : params.title,
		closable : true,
//		iconCls : params.iconCls,
		content : iframe,
		border : false,
		fit : true
	};
	if (t.tabs('exists', opts.title)) {
		t.tabs('select', opts.title);
//		parent.$.messager.progress('close');
	} else {
		t.tabs('add', opts);
	}
}