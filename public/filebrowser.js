function mkdir(){
	var name = prompt('What would you like to name the file?');
	var url = window.location.origin+window.location.pathname;
	console.log(url);
	return $.post({
			url:url,
			data:{data:name},
			success:function(data){
				window.location.href=url;
				console.log('Directory created');
			}, error:function(e){
				alert(e);
			}
		});
}

function touch(){
	var name = prompt('What would you like to name the file?');
	var url = window.location.origin+window.location.pathname+name;
	console.log(url);
	return $.post({
			url:url,
			data:{data:'\t'},
			success:function(data){
				window.location.href=url+'?edit=1';
				console.log('File created');
			}, error:function(e){
				alert(e);
			}
		});
}

function toggle(a){
	console.log(a.currentTarget);
	var target = a.currentTarget.getAttribute('data-target');
	
	if($('[data-slide="'+target+'"]').hasClass('toggled')){
		$('.toggled').each(function(a,b){
			$(b).removeClass('toggled');
			$(b).slideUp(300);
		});
	} else {
		$('.toggled').each(function(a,b){
			$(b).removeClass('toggled');
			$(b).slideUp(300);
		});
		$('[data-slide="'+target+'"]').slideDown(300);
		$('[data-slide="'+target+'"]').addClass('toggled');
	}
	console.log(a);

}

function main(){
	$('#_file').click(touch);
	$('#_folder').click(mkdir);
	$('.options').click(toggle);
}
$(main);