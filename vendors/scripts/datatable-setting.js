$(function() {
	var dataTableOptions = {
	  scrollCollapse: true,
	  autoWidth: false,
	  responsive: true,
	  columnDefs: [{
		targets: "datatable-nosort",
		orderable: false,
	  }],
	  lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
	  language: {
		info: "_START_-_END_ of _TOTAL_ entries",
		searchPlaceholder: "Search",
		paginate: {
		  next: '<i class="ion-chevron-right"></i>',
		  previous: '<i class="ion-chevron-left"></i>'  
		}
	  },
	};
	
	$('.data-table').DataTable(dataTableOptions);
  
	$('.data-table-export').DataTable($.extend(dataTableOptions, {
	  dom: 'Bfrtp',
	  buttons: [
		'copy', 'csv', 'pdf', 'print'
	  ]
	}));
  
	$('.select-row, .multiple-select-row').DataTable({
	  scrollCollapse: true,
	  autoWidth: false,
	  responsive: true,
	  lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
	  language: {
		info: "_START_-_END_ of _TOTAL_ entries",
		searchPlaceholder: "Search",
		paginate: {
		  next: '<i class="ion-chevron-right"></i>',
		  previous: '<i class="ion-chevron-left"></i>'  
		}
	  }
	});
  
	$('.checkbox-datatable').DataTable($.extend(dataTableOptions, {
	  columnDefs: [{
		targets: 0,
		searchable: false,
		orderable: false,
		className: 'dt-body-center',
		render: function(data, type, full, meta) {
		  return '<div class="dt-checkbox"><input type="checkbox" name="id[]" value="' + $('<div/>').text(data).html() + '"><span class="dt-checkbox-label"></span></div>';
		}
	  }],
	  order: [[1, 'asc']]
	}));
  
	var table = $('.checkbox-datatable').DataTable();
	$('#example-select-all').on('click', function() {
	  var rows = table.rows({ search: 'applied' }).nodes();
	  $('input[type="checkbox"]', rows).prop('checked', this.checked);
	});
  
	$('.checkbox-datatable tbody').on('change', 'input[type="checkbox"]', function() {
	  var el = $('#example-select-all').get(0);
	  if (!this.checked && el && el.checked && 'indeterminate' in el) {
		el.indeterminate = true;
	  }
	});
	
	// Export option function
	$('.export-btn').on('click', function() {
	  var table = $(this).data('table');
	  $(table).DataTable().buttons.exportData();
	});
  });
  