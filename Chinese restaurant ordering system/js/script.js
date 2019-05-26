 

$(document).ready(function(){

    var FixedCombo = function(title,price,qty) {
        this.title = title;
        this.price = price;
        this.qty=qty;
        this.totalprice=this.price * this.qty;
    }

    var SingleDish = function(title,price,qty) {
        this.title = title;
        this.price = price;
        this.qty=qty;
        this.totalprice=this.price * this.qty;
    }

    var OptCombo = function(meat,meatprice,vegie,vegieprice,staple,stapleprice) {
        this.meat = meat;
        this.meatprice=meatprice;
        this.vegieprice=vegieprice;
        this.stapleprice=stapleprice;
        this.vegie = vegie;
        this.staple = staple;
        this.totalprice=meatprice+vegieprice+stapleprice;
    }

    var fixedComboArr=new Array(3);
    for(var i=0;i<fixedComboArr.length;i++){
        fixedComboArr[i]=new FixedCombo('','',0);
    }

    var optComboArr=[];

    var singleDishArr=new Array(26);
    for(var i=0;i<singleDishArr.length;i++){
        singleDishArr[i]=new SingleDish('','',0);
    }

    var orderedfix=false;
    var fixedCount=0;
    function creatFixedCombo(){
        var count=0;
        for(var i=0;i<fixedComboArr.length;i++){
            var a=i+1;
            var idqty='#fixedcombo'+a+'qty';
            var idtitle='#fixedcombo'+a+'title';
            var idprice='#fixedcombo'+a+'price';
            var currQty=parseInt(fixedComboArr[i].qty)+parseInt($(idqty).val());
            if(currQty!=0){
                fixedComboArr[i]=new FixedCombo($(idtitle).text(),parseFloat($(idprice).text()),currQty);
                $(idqty).val('0');
                count+=currQty;
            }
        }
        if(count>fixedCount){
            orderedfix=true;
            fixedCount=count;
        }
    }
    
    var orderedsingle=false;
    var singleCount=0;
    function creatSingleDish(){
        var count=0;
        for(var i=0;i<singleDishArr.length;i++){
            var a=i+1;
            var idqty='#dish'+a;
            var idtitle='#dishdes'+a;
            var idprice='#dishprice'+a;
            var currQty=parseInt(singleDishArr[i].qty)+parseInt($(idqty).val());
            if(currQty!=0){
                singleDishArr[i]=new SingleDish($(idtitle).text(),parseFloat($(idprice).text()),currQty);
                $(idqty).val('0');
                count+=currQty;
            }
        }
        if(count>singleCount){
            orderedsingle=true;
            singleCount=count;
        }
    }

    function creatOptCombo(){
        var meatID=$("input[name='meat']:checked").val(); 
        var vegID=$("input[name='vegie']:checked").val(); 
        var stapleID=$("input[name='staple']:checked").val(); 
        
        var meatTitle, meatPrice, vegTitle, vegPrice, stapleTitle, staplePrice;
        for(var i=1;i<4;i++){
            if(meatID==i){
                var idtitle="#meattitle"+i;
                var idprice="#meatprice"+i;
                meatTitle=$(idtitle).text()
                meatPrice=$(idprice).text()
            }
            if(vegID==i){
                var idtitle="#vegtitle"+i;
                var idprice="#vegprice"+i;
                vegTitle=$(idtitle).text()
                vegPrice=$(idprice).text()
            }
            if(stapleID==i){
                var idtitle="#stapletitle"+i;
                var idprice="#stapleprice"+i;
                stapleTitle=$(idtitle).text()
                staplePrice=$(idprice).text()
            }
        }
        var newOptCombo=new OptCombo(meatTitle,parseFloat(meatPrice),vegTitle,parseFloat(vegPrice),stapleTitle,parseFloat(staplePrice));
        optComboArr.push(newOptCombo);
    }

    $('#add1').click(function(){
        if( $("#fixedcombomenu").is(':visible')){
            creatFixedCombo();
            if(orderedfix==true){
                $("#fixedcombomenu").fadeOut(function(){
                    $('[id=successordered]').fadeIn(1000,function(){
                        $('[id=successordered]').fadeOut(function(){
                            $('#fixedcombomenu').fadeIn();
                        })
                    })
                })
                orderedfix=false;
            }
            else{
                $("#fixedcombomenu").fadeOut(function(){
                    $('[id=failordered]').fadeIn(1000,function(){
                        $('[id=failordered]').fadeOut(function(){
                            $('#fixedcombomenu').fadeIn();
                        })
                    })
                })
            } 
        }
        else if ($("#optionalcombomenu").is(':visible')){
            creatOptCombo();
            $("#optionalcombomenu").fadeOut(function(){
                $('[id=successordered]').fadeIn(1000,function(){
                    $('[id=successordered]').fadeOut(function(){
                        $('#optionalcombomenu').fadeIn();
                    })
                })
            })
        }
        else{
            return;
        }
        
    })
    
    var prevNav;
    $('#add2').click(function(){
        creatSingleDish();
        if(orderedsingle==true){
            if(prevNav==1){
                $(".menudiyright,.menudiyleftwestern").fadeOut(function(){
                    $('#successordered1').fadeIn(1000,function(){
                        $('#successordered1').fadeOut(function(){
                            $(".menudiyright,.menudiyleftwestern").fadeIn();
                        })
                    })
                })
            }
            else{
                $(".menudiyright,.menudiyleftchinese").fadeOut(function(){
                    $('#successordered1').fadeIn(1000,function(){
                        $('#successordered1').fadeOut(function(){
                            $(".menudiyright,.menudiyleftchinese").fadeIn();
                        })
                    })
                })
            }
            
            orderedsingle=false;
        }
        else{
            if(prevNav==1){
                $(".menudiyright,.menudiyleftwestern").fadeOut(function(){
                    $('#failordered1').fadeIn(1000,function(){
                        $('#failordered1').fadeOut(function(){
                            $(".menudiyright,.menudiyleftwestern").fadeIn();
                        })
                    })
                })
            }
            else{
                $(".menudiyright,.menudiyleftchinese").fadeOut(function(){
                    $('#failordered1').fadeIn(1000,function(){
                        $('#failordered1').fadeOut(function(){
                            $(".menudiyright,.menudiyleftchinese").fadeIn();
                        })
                    })
                })
            }
        } 
    })


    function render_item(data,index){
        var ordereditem='<div class="ordereditem" orderindex="'+index+'"> '+
        '<p class="itemdetail">'+data+'</p>'+
        '<img src="images/cancle.png" alt="cancle" width="20px" height="20px" class="itemcancle"></div>';

        return ordereditem;
    }

    function listen_item_delete() {
        $item_delete_trigger.on('click', function () {

          var $this = $(this);
      
          var $item = $this.parent();
          
          
          var index= $item.attr('orderindex');
        
          delete_item(index);
   
        })
      }

      function totalprice(){
          var total=0;
          for(var i=0;i<listprice.length;i++){
              total+=parseFloat(listprice[i]) ;
          }
          return total;
      }

      function render_price(price){
          var priceitem='<br><p class="price"><strong>Sub-total: $'+ price.toFixed(2)+'</strong></p><br>'+
          '<p class="price">GST: $'+(price*0.05).toFixed(2)+'</p><p class="price">RST: $'+(price*0.08).toFixed(2)+'</p><br><p class="price"><strong>Total: $'+(price*1.13).toFixed(2)+'</strong></p>';
          return priceitem;
      }

      function refresh_price(){
          var total=totalprice();
          var data=render_price(total);
          $(".priceinfo").html(data);

      }

      function delete_item(index){
     
  
        list[index]='';
        listprice[index]=0;
        

        $("#orderedlist").html(list);
        refresh_price();
        $item_delete_trigger=$(".itemcancle");    
        listen_item_delete();
      }

      function refresh_item_list(){
        var list1=listOrdered();
        $("#orderedlist").html(list1);
        
        $item_delete_trigger=$(".itemcancle");    
        listen_item_delete();    
      }
    
    var list=[];
    var listprice=[];
    var index=0;
    
    function listOrdered(){
        if(fixedComboArr!=undefined){
            for(var i=0;i<fixedComboArr.length;i++){
                if(fixedComboArr[i].qty!=0){
                    var content="Fixed Combo:&nbsp&nbsp&nbsp"+fixedComboArr[i].title+";&nbsp&nbsp&nbspQty: "+fixedComboArr[i].qty+";&nbsp&nbsp&nbspTotal Amout: "+fixedComboArr[i].totalprice.toFixed(2);
                    var data=render_item(content,index++);
                    list.push(data);
                    listprice.push(fixedComboArr[i].totalprice.toFixed(2));
                }
            }
        }

        if(optComboArr!=undefined){
            for(var i=0;i<optComboArr.length;i++){
                if(optComboArr[i]!=null){
                    var content="Optional Combo:&nbsp&nbsp&nbsp("+optComboArr[i].meat+", "+optComboArr[i].vegie+", "+optComboArr[i].staple+");&nbsp&nbsp&nbspTotal Amout: "+optComboArr[i].totalprice.toFixed(2);
                    var data=render_item(content,index++);
                    list.push(data);
                    listprice.push(optComboArr[i].totalprice.toFixed(2));
                }
            }
        }

        if(singleDishArr!=undefined){
            for(var i=0;i<singleDishArr.length;i++){
                if(singleDishArr[i].qty!=0){
                    var content="Dish:&nbsp&nbsp&nbsp"+singleDishArr[i].title+";&nbsp&nbsp&nbspQty: "+singleDishArr[i].qty+";&nbsp&nbsp&nbspTotal Amout: "+singleDishArr[i].totalprice.toFixed(2);
                    var data=render_item(content,index++);
                    list.push(data);
                    listprice.push(singleDishArr[i].totalprice.toFixed(2));
                }
            }
        }

        clearCache();

        return list;

    }

    function clearCache(){
        for(var i=0;i<fixedComboArr.length;i++){
            fixedComboArr[i]=new FixedCombo('','',0);
        }
    
        for(var i=0;i<optComboArr.length;i++){
            optComboArr[i]=null;
        }

        for(var i=0;i<singleDishArr.length;i++){
            singleDishArr[i]=new SingleDish('','',0);
        }
        singleCount=0;
        fixedCount=0;
    }
   

    var prevPage;
    $("[id=viewordered]").click(function(){
        
        if( $(".combopage").is(':visible')){
            prevPage=$(".combopage");
        }
        else{
            prevPage=$(".diypage");
        }
        $('.combopage').hide();
        $(".diypage").hide();
        $(".viewpage").fadeIn(500);
        refresh_item_list();
        refresh_price();
    }) 

    $("#viewback").click(function(){
        $('.viewpage').hide();
        $(prevPage).fadeIn(500);
    }) 

    //hide everything 
    $(".combopage").hide();
    $(".statisticpage").hide();
    $(".statisticpsw").hide();
    $(".diypage").hide();
    $(".menureal").hide();
    $(".menudiyleftwestern").hide();
    $(".menudiyleftchinese").hide();
    $(".menudiyright").hide();
    $("#salespage").hide();
    $("#back1").hide();
    $("#back2").hide();


    
    //main page ations
    $("#combo").click(function(){
        $(".mainpage").hide();
        $(".combopage").show(500);
    });

    $("#diy").click(function(){
        $(".mainpage").hide();
        $(".diypage").show(500);
    });

    $("#statistic").click(function(){
        $(".mainpage").hide();
        $("#password").val("");
        $(".statisticpsw").fadeIn(500);
    });
     //main page  end

     //statistic psw page ations
    $("#pswconfirm").click(function(){
        $(".statisticpsw").hide();
        $(".statisticpage").fadeIn(500);
    });

    $("#statisticpswtomain").click(function(){
        $(".statisticpsw").hide();
        $(".mainpage").fadeIn(500);
    });
    //statistic psw page end

    //statistic page ations

    $("#statistictomain").click(function(){
        $(".statisticpage").hide();
        $(".mainpage").fadeIn(500);
    });

    var staPage;

     $("#sales").click(function(){
        staPage=$("#salespage");
        $("#statistic1").hide();
        $("#statistic2").hide();
        $("#back0").hide();
        $("#salespage").fadeIn(500);
        $("#back1").fadeIn(500);
    });

    $("#inventory").click(function(){
        staPage=$("#invpage");
        $("#statistic1").hide();
        $("#statistic2").hide();
        $("#back0").hide();
        $("#invpage").fadeIn(500);
        $("#back1").fadeIn(500);
    });

    $("#back1").click(function(){
        $(staPage).hide();
        $("#back1").hide();
        $("#statistic1").fadeIn(500);
        $("#statistic2").fadeIn(500);
        $("#back0").fadeIn(500);

    });

    //statistic page ations end



    //combo page ations

    $("#combotomain").click(function(){
        $(".combopage").hide();
        $(".mainpage").fadeIn(500);
    });//go back to main page

    //fixed combo menu actions 
    

    var ifFixedDes=true;
    var ifOptDes=true;

    $("#fixedcombo").click(function(){
        $("#fixedcombo").css("background-color", "#e0e0e0");
        $("#fixedcombo").css("color", "#4d4d4d");
        $("#optionalcombo").css("background-color", "white");
        $("#optionalcombo").css("color", "#4d4d4d");
        $("#optionalcombomenu").hide();
        $("#optionaldes").hide();
        if(ifFixedDes==true){
            $("#fixeddes").fadeIn(1500,function(){
                $("#fixeddes").hide(function(){
                    $("#optionalcombomenu").hide();
                    $("#fixedcombomenu").fadeIn();
                });
                ifFixedDes=false;
    
            });
            }
        else{
            $("#optionalcombomenu").hide();
            $("#fixedcombomenu").fadeIn();
        }
            
        

    });

    //optional combo menu actions 
    $("#optionalcombo").click(function(){
        $("#optionalcombo").css("background-color", "#e0e0e0");
        $("#optionalcombo").css("color", "#4d4d4d");
        $("#fixedcombo").css("background-color", "white");
        $("#fixedcombo").css("color", "#4d4d4d");
        $("#fixedcombomenu").hide();
        $("#fixeddes").hide();
        if(ifOptDes==true){
            $("#optionaldes").fadeIn(1500,function(){
                $("#optionaldes").hide(function(){
                    $("#fixedcombomenu").hide();
                    $("#optionalcombomenu").fadeIn();
                });
                ifOptDes=false;
    
            });
            }
        else{
            $("#fixedcombomenu").hide();
            $("#optionalcombomenu").fadeIn();
        }
    });


    //optional combo menu actions end

    //combo page ations end


    //diy page ations

    //back to main page
    $("#diytomain").click(function(){
        $(".diypage").hide();
        $(".mainpage").fadeIn(500);
    });//end

    //chinese style menu actions 

    $("#chinesebutton").click(function(){
        prevNav=2;
        $("#chinesebutton").css("background-color", "#e0e0e0");
        $("#chinesebutton").css("color", "#4d4d4d");
        $("#westernbutton").css("background-color", "white");
        $("#westernbutton").css("color", "#4d4d4d");
        $(".menudiyleftwestern").hide();
        $("#diydescription").hide();
        $(".menudiyright").fadeIn();
        $(".menudiyleftchinese").fadeIn();
    });

    $("[id=chefbtn]").click(function(){
        $(".porkdish,.bldish,.chickendish,.seadish,.vegdish,.soupdish,.stapledish,.snackdish,.appdish").hide();
        $(" #chicken1, #sea2, #veg2, #bl2，#app2, #soup2").fadeIn();
    });

    $("[id=appbtn]").click(function(){
        $(".porkdish,.bldish,.chickendish,.seadish,.vegdish,.soupdish,.stapledish,.snackdish").hide();
        $(".appdish").fadeIn();
    });

    $("[id=soupbtn]").click(function(){
        $(".porkdish,.bldish,.chickendish,.seadish,.vegdish,.appdish,.stapledish,.snackdish").hide();
        $(".soupdish").fadeIn();
    });

    $("#sfdbtn").click(function(){
        $(".porkdish,.bldish,.chickendish,.soupdish,.vegdish,.appdish,.stapledish,.snackdish").hide();
        $(".seadish").fadeIn();
    });

    $("#cdbtn").click(function(){
        $(".porkdish,.bldish,.seadish,.soupdish,.vegdish,.appdish,.stapledish,.snackdish").hide();
        $(".chickendish").fadeIn();
    });

    $("#blbtn").click(function(){
        $(".porkdish,.chickendish,.seadish,.soupdish,.vegdish,.appdish,.stapledish,.snackdish").hide();
        $(".bldish").fadeIn();
    });

    $("#porkbtn").click(function(){
        $(".bldish,.chickendish,.seadish,.soupdish,.vegdish,.appdish,.stapledish,.snackdish").hide();
        $(".porkdish").fadeIn();
    });

    $("[id=vegbtn]").click(function(){
        $(".bldish,.chickendish,.seadish,.soupdish,.porkdish,.appdish,.stapledish,.snackdish").hide();
        $(".vegdish").fadeIn();
    });

    $("[id=stapbtn]").click(function(){
        $(".bldish,.chickendish,.seadish,.soupdish,.porkdish,.appdish,.vegdish,.snackdish").hide();
        $(".stapledish").fadeIn();
    });

    $("[id=sdbtn]").click(function(){
        $(".bldish,.chickendish,.seadish,.soupdish,.porkdish,.appdish,.vegdish,.stapledish").hide();
        $(".snackdish").fadeIn();
    });
    
    $("#hotbtn").click(function(){
        $(".soupdish,.snackdish,.appdish,.vegdish,.stapledish").hide();
        $(".bldish,.chickendish,.seadish,.porkdish").fadeIn();
    });


    
    //chinese style  menu actions end


     //western style menu actions 

    $("#westernbutton").click(function(){
        prevNav=1;
        $("#westernbutton").css("background-color", "#e0e0e0");
        $("#westernbutton").css("color", "#4d4d4d");
        $("#chinesebutton").css("background-color", "white");
        $("#chinesebutton").css("color", "#4d4d4d");
        $(".menudiyleftchinese").hide();
        $("#diydescription").hide();
        $(".menudiyright").fadeIn();
        $(".menudiyleftwestern").fadeIn();
    });
    //western style  menu actions end
    //diy page ations end


    $("#done").click(function(){
        var result=confirm('Notice: You can not modify the order after confirming.');
        if(result == true){
            $('.viewpage').hide();
            $("#choosepayment").fadeIn(500);
        }
        else
        return;
    })

    $("#cash,#card").click(function(){
            $('#choosepayment').hide();
            $("#finalpay").fadeIn(500);
            var result='<br><br><br>Total: $'+(totalprice()*1.13).toFixed(2)+'<br><br>Add Tips:&nbsp&nbsp<input type="text">';
            $('#tipss').html(result);
           
    })

    $("#topayment").click(function(){
        $('#finalpay').hide();
        $("#choosepayment").fadeIn(500);
    })

    $("#confirmtocon").click(function(){
        var result=confirm('Sure to place your order?');
        if(result==true){
            $('#finalpay').hide();
            $("#congrats").fadeIn(500);
        }
        else
        return;
        
    })

    $("#finaltomain").click(function(){
        window.location.reload();
    })

    $("#tomore").click(function(){
        window.open('more/start.html');
    })

    

})