$(document).ready( function() {
  
    
 var $grid = $('.grid').isotope({itemSelector: '.element-item', percentPosition: true, masonry: {columnWidth: '.grid-sizer'}});

$grid.isotope('shuffle');

$grid.imagesLoaded().progress( function() {$grid.isotope('layout');});

$grid.on( 'click', '.element-item', function() {$(this).toggleClass('gigante'); $grid.isotope('layout');});
    
  $('.filters-button-group').on( 'click', 'button', function() {      
      var filterValue = $(this).attr('data-filter');
  $grid.isotope({ filter: filterValue });
  });
    
  $('.button-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find('.is-checked').removeClass('is-checked'); $( this ).addClass('is-checked');});
  });
    
});