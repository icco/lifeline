var data = [
   {
      "img": "img/235europe.jpg",
      "release": "Nat Welch 2.3.5-europe",
      "changes" : [
         "Nat completed a one month trip to Europe.",
         "Nat visited the UK, including the towns of London, Edinburgh, Glasgow, York and Harrogate.",
         "Nat visited Paris, France."
      ],
   },
   {
      "img" : "img/22.jpg",
      "release" : "Nat Welch 2.2",
      "changes" : [
         "Nat completed his 22nd birthday.",
      ]
   }
];

window.addEvent('domready', function() {
   ul = new Element('ul', {id: 'events'});

   data.each(function (ev) {
      console.log(ev);

      ul.adopt(new Element('li', {html: ev.release}));
   });

   $('data').adopt(ul);
});
