$(document).on("click","#btncadastro",function(){
var parametros={
   "nome": $("#txtModelo").val(),
        "cor": $("#txtCor").val(),
        "fabricante": $("#txtFabricante").val(),
        "ano": $("#txtAno").val(),
        "valor": $("#txtValor").val(),
 };
 $.ajax({
   type:"post",
   url:"https://entregar-nicollepereira.c9users.io/cadastrar.php",
   data:parametros,
   success:function(data){
     navigator.notification.alert(data);
     $("#txtNome").val("");
          $("#txtCor").val("")
           $("#txtFabricante").val("");
            $("#txtAno").val("");
             $("#txtValor").val("");
        },
   error:function(data){
     navigator.notification.alert("erro:"+data);
    }
    });
 });
 
    $(document).on("click","#btnListar",function(){
$(location).attr("href","listar.html");
});

function preenchepessoas(){
$.ajax({
  type:"post",
  url:"https://entregar-nicollepereira.c9users.io/listacarro.php",
  dataType: "json",
  success:function(data){
    var itemlista="";
    $.each(data.carro,function(i,dados){
      itemlista += "<option value='"+dados.codigo+"'>"+dados.modelo+"</option>>";

    });
    $("#listar").html(itemlista);
  },
  error:function(data){

    navigator.notification.alert("erro:"+data)
  }
});
}
$(document).on("change","#listar",function(){
    var codigoSelecionado=$("option:selected",("#listar")).val();
    $.ajax({
     type:"get",
    url:"https://entregar-nicollepereira.c9users.io/listar.php",
    data:"codigo="+codigoSelecionado,
    dataType:"json",
    success:function(data){
     $.each(data.carro,function(i,data){
       $("#codigo").val(data.codigo);
       $("#txtCor").val(data.cor);
       $("#txtFabricante").val(data.fabricante);
       $("#txtAno").val(data.ano);
       $("#txtValor").val(data.valor);
     });
       },
      error:function(data){
   navigator.notification.alert("error:"+data);
     }
   });
});

$(document).on("click","#salvarEdit",function(){
 var parametros={
   "codigo":$("#codigo").val(),
   "cor":$("#txtCor").val(),
   "fabricante":$("#txtFabricante").val(),
   "ano":$("#txtAno").val(),
   "valor":$("#txtValor").val()
 };
 $.ajax({
   type:"post",
   url:"https://entregar-nicollepereira.c9users.io/atualizar.php",
   data:parametros,
   success:function(data){
     navigator.notification.alert(data);
    location.reload();
   },
   error:function(data){
     navigator.notification.alert("erro:"+data);
    }
    });
   });



 
$(document).on("click","#btndeletar",function(){
  var codigoSelecionado=$("option:selected",("#listar")).val();
  $.ajax({
    type:"get",
    url:"https://entregar-nicollepereira.c9users.io/deletar.php",
    data:"codigo="+codigoSelecionado,
    success:function(data){
      navigator.notification.alert(data);
      location.reload();
    },
    error:function(data){
      navigator.notification.alert("error:"+data)
    }
  });
});
$(document).on("click","#editar",function(){
  habilita();
});
$(document).on("click","#cancelar",function(){
 desabilita();
 $("#txtNome").val("");
 $("#txtCor").val("");
 $("#txtFabricante").val("");
 $("#txtAno").val("");
 $("#txtValor").val("");
});
function desabilita(){
  $("#txtNome").prop('readonly',true);
    $("#txtCor").prop('readonly',true);
     $("#txtFabricante").prop('readonly',true);
      $("#txtValor").prop('readonly',true);
      $("#txtAno").prop('readonly',true);
}
function habilita(){
  $("#txtNome").prop('readonly',false);
    $("#txtCor").prop('readonly',false);
     $("#txtFabricante").prop('readonly',false);
      $("#txtValor").prop('readonly',false);
      $("#txtAno").prop('readonly',false);
      }