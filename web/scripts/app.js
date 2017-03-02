var app = {

  send: function(site) {
    $.ajax({
      url: '',// app server URL,
      type: 'POST',
      data: JSON.stringify(site),
      success: function (data) {
        // Clear URL input
        $('#url').val('');

        // Trigger a fetch to show user archived site if we have it
        app.fetch();
      },
      error: function (error) {
        console.error('Archive: Failed to send URL', error);
      }
    });
  }

  // fetch: function(site) {
  //
  // }
};
