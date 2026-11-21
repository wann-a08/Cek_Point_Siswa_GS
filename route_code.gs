function doGet(e) {

  const api = e?.parameter?.api;

  // ==========================================
  // REST API
  // ==========================================

  if (api) {
    return handleApiRequest(e);
  }


  // ==========================================
  // WEB PUBLIC
  // ==========================================

  return HtmlService
    .createTemplateFromFile("PUBLIC.index")
    .evaluate()
    .setTitle("Cek Data Siswa");
}


function doPost(e) {

  const api = e?.parameter?.api;

  if (!api) {
    return jsonResponse({
      status: false,
      message: "Parameter API tidak ditemukan."
    });
  }

  try {

    switch (api) {

      // ==========================================
      // LOGIN API
      // ==========================================

      case "login": {

        const body = JSON.parse(
          e.postData.contents
        );

        return jsonResponse(
          loginApi(
            body.username,
            body.password
          )
        );
      }

      case "input-pelanggaran": {

        const body = JSON.parse(
          e.postData.contents
        );

        return jsonResponse(
          tambahPelanggaran(body)
        );
      }

      // ==========================================
      // API TIDAK DITEMUKAN
      // ==========================================

      default:

        return jsonResponse({
          status: false,
          message: "API tidak ditemukan."
        });

    }

  } catch (error) {

    return jsonResponse({
      status: false,
      message: error.message
    });

  }

}