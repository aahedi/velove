var versi = "1";
var url = "https://kanaya.my.id/app/";
var url_admin = "https://kanaya.my.id/";
var api_ongkir = "https://ongkir.tokojs.com/api_ongkir/";

var token='6KB4J3xGZX';
var nama_aplikasi='Kanaya';
var id_pelanggan=localStorage.getItem('id_pelanggan');

var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

$(document).ready(function() {onload();
	$('#nama_aplikasi').html(nama_aplikasi);
 	menu_kiri();
    menu_kanan();
    menu_tengah();
    cek_localstorage();
    rute();arah();
	cek_versi('pesan');
    text_berjalan();
    suntikCSS();                        
});
function suntikCSS(){
var suntikCSS = document.createElement("style");
suntikCSS.innerHTML = ".menu ul li{height:180px}#navbawah ul li a i{font-size:16px}#navbawah ul li a{font-size:11px}";
document.head.appendChild(suntikCSS);
}
function logout() {
    var a = confirm("Yakin akan keluar dari akun ini?");
    if (a == true) {
    	localStorage.removeItem('id_pelanggan');
    	localStorage.removeItem('url_id_kategori');
    	localStorage.removeItem('url_id_produk');
        location.reload();
    }
}
function menu_kiri() {
	$("#menu_kiri").html('');
    $("#menu_kiri").append("<div>");
    $("#menu_kiri").append("<h4>Menu Kiri</h4>");
    $("#menu_kiri").append("<ul>");
    var id_pelanggan=localStorage.getItem('id_pelanggan');
    if (id_pelanggan == "" || !id_pelanggan) {
        $("#menu_kiri").append("<li style=\"list-style:none\"><a href=\"#login\"><i class=\"icon-lock\"></i>Login</a></li>");
        $("#menu_kiri").append("<li style=\"list-style:none\"><a href=\"#daftar\"><i class=\"icon-vcard\"></i>Daftar</a></li>");
    } else {
        $("#menu_kiri").append("<li style=\"list-style:none\"><a href=\"#profile\"><i class=\"icon-user\"></i>Profile Anda</a></li>");
        $("#menu_kiri").append("<li style=\"list-style:none\"><a href=\"#riwayat_order\"><i class=\"icon-doc-text\"></i>Pembayaran Nota</a></li>");
        $("#menu_kiri").append("<li style=\"list-style:none\"><a href=\"#informasi\"><i class=\"icon-info\"></i>Informasi</a></li>");
        $("#menu_kiri").append('<li style="list-style:none"><a href="javascript:;" onclick="logout()"><i class=\"icon-power\"></i>Logout</a></li>');
        $("#menu_kiri").append("<li style=\"list-style:none\"><a href=\"#kirim_pesan\"><i class=\"icon-mail\"></i>Kirim Pesan</a></li>");
        $("#menu_kiri").append("<li style=\"list-style:none\"><a href=\"#saldo\"><i class=\"icon-credit-card\"></i>Saldo</a></li>");
        $("#menu_kiri").append("<li style=\"list-style:none\"><a href=\"#point\"><i class=\"icon-chart\"></i>Point</a></li>");
   
    }
    $("#menu_kiri").append("<li style=\"list-style:none\"><a href=\"#kontak\"><i class=\"icon-contacts\"></i>Kontak Kami</a></li>");
   // $("#menu_kiri").append('<li style="list-style:none"><a href="javascript:;">Beli Voucher</a></li>');
    //$("#menu_kiri").append('<li style="list-style:none"><a href="javascript:;">Kode Promo</a></li>');
    $("#menu_kiri").append("</ul>");
    $("#menu_kiri").append("<div>")
}
function menu_kanan() {
	$("#menu_kanan").html('');
    $("#menu_kanan").append("<div>");
    $("#menu_kanan").append("<h4>Menu Kanan</h4>");
    $("#menu_kanan").append('<ul>');
    $("#menu_kanan").append("<li style=\"list-style:none\"><a href=\"#page+1\"><i class=\"icon-pencil\"></i>Cara Order</a></li>");
    $("#menu_kanan").append("<li style=\"list-style:none\"><a href=\"#page+3\"><i class=\"icon-lightbulb\"></i>Info Reseller</a></li>");
    $("#menu_kanan").append("<li style=\"list-style:none\"><a href=\"#rekening\"><i class=\"icon-tags\"></i>Info Rekening</a></li>");
    $("#menu_kanan").append("<li style=\"list-style:none\"><a href=\"#cek_ongkir\"><i class=\"icon-calculator\"></i>Cek Ongkir</a></li>");
    $("#menu_kanan").append("<li style=\"list-style:none\"><a href=\"javascript:;\" onclick=\"window.open('http://cekresi.com', '_blank', 'location=no');\" ><i class=\"icon-ticket\"></i>Cek Resi</a></li>");
    $("#menu_kanan").append("<li style=\"list-style:none\"><a href=\"#page+2\"><i class=\"icon-star-filled\"></i>Testimoni</a></li>");
    $("#menu_kanan").append("<li style=\"list-style:none\"><a href=\"#update\"><i class=\"icon-upload-cloud\"></i>Update</a></li>");
    $("#menu_kanan").append("</ul>");
    $("#menu_kanan").append("</div>")
}
function menu_tengah() {
	$("#menu_tengah").html('');
    $("#menu_tengah").append("<li id=\"border\"><a href=\"javascript:;\" onclick=\"openmenu('left');\" id=\"open-left\"><i class=\"icon-menu\"></i><br>Menu</a></li>");
    $("#menu_tengah").append("<li id=\"border\"><a href=\"#kategori\"><i class=\"icon-picture\"></i><br>Produk</a></li>");
    $("#menu_tengah").append("<li id=\"border\"><a href=\"javascript:;\" onclick=\"buka_keranjang()\"><i class=\"icon-basket\"></i><br>Troly</a></li>");
    $("#menu_tengah").append("<li id=\"border\" class=\"bordercari\"><a href=\"javascript:;\" onclick=\"buka_cari()\"><i class=\"icon-search\"></i><br>Search</a></li>");
    $("#menu_tengah").append("<li id=\"border\"><a href=\"#riwayat_order\"><i class=\"icon-doc-text\"></i><br>Nota</a></li>");
    $("#menu_tengah").append("<li id=\"border\"><a href=\"javascript:;\" onclick=\"openmenu('right');\" id=\"open-right\"><i class=\"icon-th-list\"></i><br>Info</a></li>");
}

function buka_halaman(halaman,prm_1,prm_2,prm_3){

var jejak = [halaman,prm_1,prm_2,prm_3];
var jejax = jejak.filter(Boolean).join('+');
location.hash = jejax;
localStorage.setItem('lokasi',jejax);

	var id_pelanggan=cek_id_pelanggan();
	cek_notif('keranjang');cek_notif('info');cek_notif('produk');cek_notif('pesan');

	$("html, body").animate({ scrollTop: 10 }, "slow");
	$.ajax({url: url+'/'+halaman+'?&token='+token+'&id_pelanggan='+id_pelanggan+'&prm_1='+prm_1+'&prm_2='+prm_2+'&prm_3='+prm_3, 
		beforeSend: function(){
                       $("#loading").show();
                   },
		success: function(result){
        		snapper.close();
				$('#isi').html(result);$('.bordercari').hide();

				localStorage.setItem(jejax,Base64.encode(result)); //simpan offline

				if(halaman=='kategori' || halaman=='produk' || halaman=='all'){$('.bordercari').show();cek_akses();}

				if(halaman=='informasi'){isi_notif('info')}

				if(halaman=='produk'){daftar_produk(prm_1,prm_2);}
          
				else if(halaman=='riwayat_order'){buka_riwayat_order(id_pelanggan);}
				else if(halaman=='pesan'){buka_daftar_pesan(id_pelanggan);}

    			else{$('#loading').hide();}

    		},

    	error: function(){
        		var tanya=confirm('Koneksi internet terganggu.. Muat ulang?');
        		if(tanya==true){
        			buka_halaman(halaman,prm_1,prm_2,prm_3);
        		}
        		else {$('#loading').hide(); alert("Mode offline diaktifkan! \nHanya bisa melihat halaman yang pernah dibuka saja dan tidak bisa transaksi");
                      rute_off(); arah_off(); //ambil offline
                     }
        		
    	},

    	timeout: 60000

})
}
function noimage(gbr){
	gbr.src = "image/default.jpg";
}
function noimage2(gbr){
	gbr.src = "image/default.jpg";
}
function daftar_produk(id_kategori,pagin){
	$("#loading").show();
	var xmlhttp= new XMLHttpRequest();
	xmlhttp.onreadystatechange=
	function(){if(xmlhttp.readyState==4){var hasil=xmlhttp.responseText;$('#result').html(hasil); $('#loading').hide();}}
	xmlhttp.open("GET",url+"/act_produk?token="+token+"&id_pelanggan="+id_pelanggan+"&prm_1="+id_kategori);
	xmlhttp.send();

		var pagei = pagin;
		$("#result").load(url+"/act_produk?token="+token+"&prm_1="+id_kategori+"&id_pelanggan="+id_pelanggan,{"page":pagei,"token":token}, 
		function(){ $("#loading").hide();});	

	$("#result").on( "click", ".pagination a", function (e){
		e.preventDefault();
		$("#loading").show();
		var page = $(this).attr("data-page");

		$("#result").load(url+"/act_produk?token="+token+"&prm_1="+id_kategori+"id_pelanggan="+id_pelanggan,{"page":page,"token":token}, function(){ window.location.href='#produk+'+id_kategori+'+'+page;
			$("#loading").hide();
		});
		
	});
}

function buka_riwayat_order(id_pelanggan){
	$("#loading").show();
	var xmlhttp= new XMLHttpRequest();
	xmlhttp.onreadystatechange=
	function(){if(xmlhttp.readyState==4){var hasil=xmlhttp.responseText;$('#result').html(hasil); $('#loading').hide();}}
	xmlhttp.open("GET",url+"/act_riwayat_order?token="+token+"&id_pelanggan="+id_pelanggan);
	xmlhttp.send();


	$("#result").on( "click", ".pagination a", function (e){
		e.preventDefault();
		$("#loading").show();
		var page = $(this).attr("data-page");
		$("#result").load(url+"/act_riwayat_order?token="+token+"&id_pelanggan="+id_pelanggan,{"page":page,"token":token}, function(){ //get content from PHP page
			$("#loading").hide();
		});
		
	});
}

function buka_daftar_pesan(id_pelanggan){
	$("#loading").show();
	var xmlhttp= new XMLHttpRequest();
	xmlhttp.onreadystatechange=
	function(){if(xmlhttp.readyState==4){var hasil=xmlhttp.responseText;$('#result').html(hasil); $('#loading').hide();}}
	xmlhttp.open("GET",url+"/daftar_pesan?token="+token+"&id_pelanggan="+id_pelanggan);
	xmlhttp.send();


	$("#result").on( "click", ".pagination a", function (e){
		e.preventDefault();
		$("#loading").show();
		var page = $(this).attr("data-page");
		$("#result").load(url+"/daftar_pesan?token="+token+"&id_pelanggan="+id_pelanggan,{"page":page,"token":token}, function(){ //get content from PHP page
			$("#loading").hide();
		});
		
	});
}
/*
$(document).on('click', 'a', function (event) {
	var link=$(this).attr('href');
	if(link.search("#") != -1 || link.search("javascript:;") != -1){
	}else{
	    event.preventDefault();
	    window.open($(this).attr('href'), '_system');}
});
*/
function convertToRupiah(b) {
    var a = "";
    var d = b.toString().split("").reverse().join("");
    for (var c = 0; c < d.length; c++) {
        if (c % 3 == 0) {
            a += d.substr(c, 3) + "."
        }
    }
    return "Rp. "+a.split("", a.length - 1).reverse().join("")
}

function cari_produk(key,id_kategori){
	$('#hasil_cari').html('<ul><li>Mencari produk...</ul></li>')
	var xmlhttp= new XMLHttpRequest();
	xmlhttp.onreadystatechange=
	function(){if(xmlhttp.readyState==4){var hasil=xmlhttp.responseText;
				document.getElementById('hasil_cari').innerHTML=hasil;
		}
	}
	xmlhttp.open("GET",url+"/cari_produk?key="+key+"&token="+token+"&id_kategori="+id_kategori);
	xmlhttp.send();
}


function cek_notif(act){
if (id_pelanggan !=null){
	$.ajax({url: url+'/cek_notif?act='+act+'&token='+token+'&id_pelanggan='+id_pelanggan,
		success: function(result){
        	if(act=='keranjang'){
        		if(result>0){$(".icon_keranjang").attr("src","image/keranjang_2.png");}
        		else {$(".icon_keranjang").attr("src","image/keranjang.png");}
        	}         	
        	else if(act=='info'){
        		isi_info=localStorage.getItem('isi_info');
        		if(result!=isi_info && result!=0){$(".icon_info").attr("src","image/info_2.png");}
        		else {$(".icon_info").attr("src","image/info.png");}
        	} 
         	else if(act=='produk'){
        		if(result>0){$(".icon_produk").attr("src","image/produk_2.png");}
        		else {$(".icon_produk").attr("src","image/produk.png");}
        	}else if(act=='pesan'){
        		if(result>0){$(".icon_pesan").attr("src","image/pesan_2.png");}
        		else {$(".icon_pesan").attr("src","image/pesan.png");}
        	} 

        },
       });
}}

function isi_notif(act){
	$.ajax({url: url+'/cek_notif?act='+act+'&token='+token+'&id_pelanggan='+id_pelanggan,
		success: function(result){
        	if(act=='info'){
        		localStorage.setItem('isi_info',result);
        	}
        	},
       });
}

function text_berjalan(){
	$.ajax({url: url+'/text_berjalan?&token='+token+'&id_pelanggan='+id_pelanggan,
		success: function(result){
        		$('.text_berjalan').html(result);
        	},
       });
}

function cek_versi(act){
	$.ajax({url: url+'/cek_versi?act='+act+'&token='+token+'&versi='+versi,
		beforeSend: function(){
           $("#loading").show();
        },
		success: function(result){
				if(act=='update'){
					if(result==""){
						alert("Maaf belum ada update terbaru untuk aplikasi "+nama_aplikasi)
					}else{
						window.open(result,'_system');
					}
				}else if(act=='pesan'){
					if(result!=""){
						var x = confirm("Sekarang sudah tersedia update untuk aplikasi "+nama_aplikasi+" versi terbaru, apakah akan update sekarang?");
						if(x==true){
							window.open(result,'_system');
						}
					}
				}
				$("#loading").hide();
        },
       });
}

function buka_keranjang(){
	var id_pelanggan=cek_id_pelanggan();
	if (id_pelanggan == "" || !id_pelanggan) {alert('Untuk membuka keranjang silahkan login atau daftar sebagai member kami.'); }
	else {buka_halaman('keranjang');}
}

function buka_pesan(){
	var id_pelanggan=cek_id_pelanggan();
	if (id_pelanggan == "" || !id_pelanggan) {alert('Untuk membuka pesan silahkan login atau daftar sebagai member kami.'); }
	else {buka_halaman('pesan');}
}

function cek_id_pelanggan(){
	var id_pelanggan=localStorage.getItem('id_pelanggan');
	return id_pelanggan;
}

function buka_cari(){
    var div = document.getElementById("kotakcari");
    if (div.style.display !== "none") {
        div.style.display = "none";
    }
    else {
        div.style.display = "block";
      document.getElementById("kata_kunci").focus();
    }
}

function cek_localstorage(){

	var isi_info=localStorage.getItem('isi_info');
	if (isi_info == "" || !isi_info) {
		localStorage.setItem('isi_info','0');
	}

}
function louncher_app(link){window.open(link,'_blank','location=no,toolbar=no','closebuttoncaption=Return')}

function download(file_img, Folder_Name, base_download_url) {
//step to request a file system 
	$("#loading").show();
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);

	function fileSystemSuccess(fileSystem) {
		var download_link = encodeURI(base_download_url+"download.php?img="+file_img);
		ext = download_link.substr(download_link.lastIndexOf('.') + 1); //Get extension of URL
/*
		var directoryEntry = fileSystem.root; // to get root path of directory
		directoryEntry.getDirectory(Folder_Name, { create: false, exclusive: false }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
		*/
		var rootdir = fileSystem.root;

		var fp = rootdir.toURL(); // atau "///storage/emulated/0/";  Returns Fulpath of local directory

		fp = fp + "/" + Folder_Name + "/" + file_img; // fullpath and name of the file which we want to give
		// download function call
		filetransfer(download_link, fp,Folder_Name);
	}

	function onDirectorySuccess(parent) {
		// Directory created successfuly
	}

	function onDirectoryFail(error) {
		//Error while creating directory
		alert("Unable to create new directory: " + error.code);
	}

	function fileSystemFail(evt) {
		//Unable to access file system
		alert(evt.target.error.code);
	 }
}

function filetransfer(download_link, fp,Folder_Name) {
var fileTransfer = new FileTransfer();
// File download function with URL and local path

fileTransfer.download(
		download_link,
		fp,
		function(entry) {
          window.galleryRefresh.refresh(
            entry.toURL(),
            function(success){ console.log(success); },
            function(error){ console.log(error); }
          );
           // refreshMedia.refresh(fp); // Refresh the image gallery
			alert("Gambar berhasil disimpan, ke direktori: '"+Folder_Name+"'");
			console.log("download complete: " + entry.toURL());
			$("#loading").hide();
			//cordova.InAppBrowser.open(fp, '_blank', 'location=yes');
			
		/*	cordova.plugins.fileOpener2.open(fp, 'image/jpeg', {
        error : function(){alert('err'+fp) }, 
        success : function(){alert('suc'+fp)} 
            } );
		*/	
		},
		function(error) {
			alert("Penyimpanan gambar gagal: Error Code = " + error.code +" "+Folder_Name );
			console.log("download error source " + error.source);
			console.log("download error target " + error.target);
			console.log("upload error code" + error.code);
			$("#loading").hide();
		},
		false,
		{
			headers: {
				"Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
			}
		}
	);
}
// END ALTERNATIVE //
function onload() {
            document.addEventListener('deviceready', deviceReady, false);
        }

        function deviceReady() {
            document.addEventListener('backbutton', backButtonCallback, false);
        }

         function backButtonCallback() {
		var rt = location.hash.split('#')[1];

var str1 = localStorage.getItem('lokasi').split(' ');

for (var i=0;i<str1.length;i++)
{
    var words = str1[i].split("+");
    var hal = words[0];
}

		if (rt != null && rt != 'kategori'){
			if (localStorage.getItem('lokasi2')===localStorage.getItem('lokasi') || hal==='produk'){if (document.getElementById('simple-popup') == null) {buka_halaman('kategori')}else{$("div").remove("#simple-popup-backdrop, #simple-popup");}
        }
			else{navigator.app.backHistory();}
		}else{
          if (document.getElementById('simple-popup') == null) {
			navigator.notification.confirm('Keluar dari aplikasi?',confirmCallback,
			nama_aplikasi,
			'Ok,Cancel');}
          else{$("div").remove("#simple-popup-backdrop, #simple-popup");}
		}
         }
         function confirmCallback(buttonIndex) {
            if(buttonIndex == 1) {localStorage.removeItem('lokasi');
             navigator.app.exitApp();
        return true;
        }
        else {
        return false
    }
}

function hidup(){
if(isAndroid) {
window.plugins.insomnia.keepAwake();}
}
function localpush(){
var tanya=confirm('Mengaktifkan Notifikasi?');
if(tanya==true){
	cordova.plugins.notification.local.schedule({
    text: "Halo sista, Selamat belanja ya!",
    //sound: "file://sounds/alert.caf",
    icon: "file://image/logo.png",
    every: day
});
    cordova.plugins.notification.local.on("click", function (notification) {
    joinMeeting(notification.data.meetingId);
});
    cordova.plugins.notification.local.getTriggered(function (notifications) {
    //alert(notifications.length);
	alert('Terima kasih telah berkunjung, Anda akan menerima notifikasi. Selamat belanja!');
});
}
else {cancelpush();}
}

function cancelpush(){
cordova.plugins.notification.local.cancelAll(function() {
    alert('Terima kasih telah berkunjung, Anda tidak akan menerima notifikasi lagi.');
}, this);
}

function pushnotif(){/*
if(isAndroid) {
if (document.getElementById('web') == null) {
if (localStorage.getItem('regis') === null) {
var push = PushNotification.init({
    android: {
        senderID: "1084978366514"
    },
    ios: {
        alert: "true",
        badge: "true",
        sound: "true"
    },
    windows: {}
});

push.on('registration', function(data) {
localStorage.setItem('regis',data.registrationId);
});

push.on('notification', function(data) {
var a  = data.title;

if(a.search("Informasi")!=-1){
     buka_halaman('informasi'); 
} else {
     buka_pesan();
}
    // data.message,
    // data.title,
    // data.count,
    // data.sound,
    // data.image,
    // data.additionalData
});

push.on('error', function(e) {
    // e.message
});
}
}
}*/
}

function rute(){
window.onload = function(){arah();}
window.onhashchange = function(){arah();}
}
function arah(){
  switch(location.hash) {
    case location.hash:
	var rt = location.hash.split('#')[1];
	if (rt == null){buka_halaman('kategori')}
	else{
      buka_halaman.apply(null,rt.split("+"));
	  }
    break;
  }
}

$(function() {

  var colors = ['#F44336','#E91E63','#9C27B0','#3F51B5','#2196F3','#009688','#4CAF50','#FF5722','#795548','#9E9E9E','#000000'],
    color;

  $('.nama_app,#marquee,#judul_isi,.judul_isi').click(function() {
    var randColor;
    do {
      randColor = colors[Math.floor(Math.random() * colors.length)];
    } while (color == randColor);
    $('#layang').css('background-color', randColor);
    $('#marquee').css('background-color', randColor);
    $('#judul_isi,.judul_isi').css('background-color', randColor);
    $('sup').css('color', randColor);
    $('.bagian .bag-right a').css('color', randColor);
    color = randColor;
  });
});

function rute_off(){
window.onload = function(){arah_off();}
window.onhashchange = function(){arah_off();}
}
function arah_off(){
  switch(location.hash) {
    case location.hash:
	if(navigator.onLine){location.reload(true);}
	else {
	var rt = location.hash.split('#')[1];
	if (rt == null){$('#isi').html(Base64.decode(localStorage.getItem('kategori')));$('#loading').hide();}
	else{
      $('#isi').html(Base64.decode(localStorage.getItem(rt)));$('#loading').hide();
	  }
    break;
	}
  }
}

function cek_akses(){
	var id_pelanggan=cek_id_pelanggan();
	if (id_pelanggan == "" || !id_pelanggan) {buka_halaman('login')}
	else {}
}

function save_img(img_file,img_url,img_folder){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
    console.log('file system open: ' + fs.name);
    fs.root.getFile(img_file, { create: true, exclusive: false }, function (fileEntry) {
        console.log('fileEntry is file? ' + fileEntry.isFile.toString());
        var oReq = new XMLHttpRequest();
        // Make sure you add the domain name to the Content-Security-Policy <meta> element.
        oReq.open("GET", img_url, true);
        // Define how you want the XHR data to come back
        oReq.responseType = "blob";
        oReq.onload = function (oEvent) {
            var blob = oReq.response; // Note: not oReq.responseText
            if (blob) {
                // Create a URL based on the blob, and set an <img> tag's src to it.
                var url = window.URL.createObjectURL(blob);
                //document.getElementById('bot-img').src = url;
                // Or read the data with a FileReader
                var reader = new FileReader();
                reader.addEventListener("loadend", function() {
                   // reader.result contains the contents of blob as text
                });
                reader.readAsText(blob);
            } else console.error('we didnt get an XHR response!');
        };
        oReq.send(null);
    }, function (err) { console.error('error getting file! ' + err); });
}, function (err) { console.error('error getting persistent fs! ' + err); });
}

!function(t){"use strict";t.fn.simplePopup=function(n){function e(){return o(),v=i(),k=r(),a(),g}function o(){if("auto"!==w.type&&"data"!==w.type&&"html"!==w.type)throw new Error('simplePopup: Type must me "auto", "data" or "html"');if(w.backdrop>1||w.backdrop<0)throw new Error('simplePopup: Please enter a "backdrop" value <= 1 of >= 0');if(w.fadeInDuration<0||Number(w.fadeInDuration)!==w.fadeInDuration)throw new Error('simplePopup: Please enter a "fadeInDuration" number >= 0');if(w.fadeOutDuration<0||Number(w.fadeOutDuration)!==w.fadeOutDuration)throw new Error('simplePopup: Please enter a "fadeOutDuration" number >= 0')}function i(){if("html"===w.type)return"html";if("data"===w.type)return"data";if("auto"===w.type){if(g.data("content"))return"data";if(t(w.htmlSelector).length)return"html";throw new Error('simplePopup: could not determine type for "type: auto"')}return!1}function r(){if("html"===v){if(!w.htmlSelector)throw new Error('simplePopup: for "type: html" the "htmlSelector" option must point to your popup html');if(!t(w.htmlSelector).length)throw new Error('simplePopup: the "htmlSelector": "'+w.htmlSelector+'" was not found');return t(w.htmlSelector).html()}if("data"===v){if(k=g.data("content"),!k)throw new Error('simplePopup: for "type: data" the "data-content" attribute can not be empty');return k}return!1}function a(){w.backdrop&&l(),w.escapeKey&&m(),p()}function p(){var n=t("<div/>",{class:"simple-popup-content",html:k}),e=t("<div/>",{id:"simple-popup",class:"hide-it"});if(w.inlineCss&&(n.css("width",w.width),n.css("height",w.height),n.css("background",w.background)),u(e),w.closeCross){var o=t("<div/>",{class:"close"});c(o),n.append(o)}e.append(n),w.beforeOpen(e),t("body").append(e),setTimeout(function(){var n=t("#simple-popup");w.inlineCss&&(n=b(n,w.fadeInTimingFunction),n=y(n,w.fadeInDuration)),n.removeClass("hide-it")});var i=setInterval(function(){"1"===t("#simple-popup").css("opacity")&&(clearInterval(i),w.afterOpen(e))},100)}function s(){var n=t("#simple-popup");w.beforeClose(n),w.inlineCss&&(n=b(n,w.fadeOutTimingFunction),n=y(n,w.fadeOutDuration)),t("#simple-popup").addClass("hide-it");var e=setInterval(function(){"0"===t("#simple-popup").css("opacity")&&(t("#simple-popup").remove(),clearInterval(e),w.afterClose())},100);w.backdrop&&d(),w.escapeKey&&h()}function u(n){t(n).on("click",function(n){"simple-popup"===t(n.target).prop("id")&&s()})}function c(n){t(n).on("click",function(t){s()})}function l(){f()}function d(){var n=t("#simple-popup-backdrop");w.inlineCss&&(n=b(n,w.fadeOutTimingFunction),n=y(n,w.fadeOutDuration)),n.addClass("hide-it");var e=setInterval(function(){"0"===t("#simple-popup-backdrop").css("opacity")&&(t("#simple-popup-backdrop").remove(),clearInterval(e))},100)}function f(){var n=t("<div/>",{class:"simple-popup-backdrop-content"}),e=t("<div/>",{id:"simple-popup-backdrop",class:"hide-it"});w.inlineCss&&(n.css("opacity",w.backdrop),n.css("background",w.backdropBackground)),e.append(n),t("body").append(e),setTimeout(function(){var n=t("#simple-popup-backdrop");w.inlineCss&&(n=b(n,w.fadeInTimingFunction),n=y(n,w.fadeInDuration)),n.removeClass("hide-it")})}function m(){t(document).on("keyup.escapeKey",function(t){27===t.keyCode&&s()})}function h(){t(document).unbind("keyup.escapeKey")}function b(t,n){return t.css("-webkit-transition-timing-function",n),t.css("-moz-transition-timing-function",n),t.css("-ms-transition-timing-function",n),t.css("-o-transition-timing-function",n),t.css("transition-timing-function",n),t}function y(t,n){return t.css("-webkit-transition-duration",n+"s"),t.css("-moz-transition-duration",n+"s"),t.css("-ms-transition-duration",n+"s"),t.css("-o-transition-duration",n+"s"),t.css("transition-duration",n+"s"),t}var k,v,g=this,w=t.extend({type:"auto",htmlSelector:null,width:"600px",height:"auto",background:"#fff",backdrop:.7,backdropBackground:"#000",inlineCss:!0,escapeKey:!0,closeCross:!0,fadeInDuration:.3,fadeInTimingFunction:"ease",fadeOutDuration:.3,fadeOutimingFunction:"ease",beforeOpen:function(){},afterOpen:function(){},beforeClose:function(){},afterClose:function(){}},n);this.selector;return e()}}(jQuery);
