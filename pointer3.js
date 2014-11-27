Pointer = new Mongo.Collection('pointers')

if (Meteor.isClient) {

  var id = new Mongo.ObjectID
  var screenX = $( window ).width() / 2
  var screenY = $( window ).width() / 2
  

  Template.pointersList.helpers({
    pointers: function(){
      return Pointer.find({})
    },
    id: function(){
      return id._str
    },
    x: function(){
      return Pointer.findOne({},{x:1, _id: id._str}).x
    },
    y: function(){
      return Pointer.findOne({},{y:1, _id: id._str}).y
    }
  })

  Template.button.rendered = function(){

    var el = this.find('a')

    Hammer(el).on('press', function(e){
      Pointer.insert({_id: id._str, x: screenX, y: screenY}, startMovementCapture())
    })

    Hammer(el).on('hammer.input', function(e){
      if(e.isFirst === false){
        Pointer.remove(id._str)
        stopMovementCapture()
      }
    })
  }

  function writeCoordinance(m){
    var x = (m.gamma*15).toPrecision(3) 
    var y = (m.beta*15).toPrecision(3)
    Pointer.update(id._str,{x: x, y: y})
    console.log("x: %s | y: %s", x,y)
  }

  function startMovementCapture(){
    window.addEventListener('deviceorientation', writeCoordinance, false)
  }

  function stopMovementCapture(){
    window.removeEventListener('deviceorientation', writeCoordinance, false)

  }



}

if (Meteor.isServer) {
  Meteor.startup(function () {

    Meteor.methods({
      clear: function(){
        Pointer.remove({})
      }
    })

  });
}
