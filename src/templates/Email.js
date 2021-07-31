module.exports = {
  /**
   * @remetente
   * @email
   * @nome
   * @token
  */
  enviarEmailCadastro(data) {
    return mailOptions = {
      from: data.remetente,
      to: data.email,
      subject: 'Cadastro Asten Censo',
      html: ` 
          <html style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
              <head>
                <meta charset="UTF-8">
                  <meta content="width=device-width, initial-scale=1" name="viewport">
                    <meta name="x-apple-disable-message-reformatting">
                      <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta content="telephone=no" name="format-detection">
                          <title>Asten Censo</title>
                          <style>
                            #outlook a {
                              padding:0;
                            }
                            .ExternalClass {
                              width:100%;
                            }
                            .ExternalClass,
                            .ExternalClass p,
                            .ExternalClass span,
                            .ExternalClass font,
                            .ExternalClass td,
                            .ExternalClass div {
                              line - height:100%;
                            }
                            .es-button {
                              mso - style - priority:100!important;
                            text-decoration:none!important;
                            }
                            a[x-apple-data-detectors] {
                              color:inherit!important;
                            text-decoration:none!important;
                            font-size:inherit!important;
                            font-family:inherit!important;
                            font-weight:inherit!important;
                            line-height:inherit!important;
                            }
                            .es-desk-hidden {
                              display:none;
                            float:left;
                            overflow:hidden;
                            width:0;
                            max-height:0;
                            line-height:0;
                            mso-hide:all;
                            }
                            .es-button-border:hover {
                              background:#ffffff!important;
                            border-style:solid solid solid solid!important;
                            border-color:#3d5ca3 #3d5ca3 #3d5ca3 #3d5ca3!important;
                            }
                            td .es-button-border:hover a.es-button-1 {
                              background:#ff6600!important;
                            border-color:#ff6600!important;
                            }
                            td .es-button-border-2:hover {
                              background:#ff6600!important;
                            }
                            @media only screen and (max-width:600px) {p, ul li, ol li, a {font - size:16px!important; line-height:150%!important } h1 {font - size:20px!important; text-align:center; line-height:120%!important } h2 {font - size:16px!important; text-align:left; line-height:120%!important } h3 {font - size:20px!important; text-align:center; line-height:120%!important } h1 a {font - size:20px!important } h2 a {font - size:16px!important; text-align:left } h3 a {font - size:20px!important } .es-menu td a {font - size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a {font - size:10px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a {font - size:12px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a {font - size:12px!important } *[class="gmail-fix"] {display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 {text - align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 {text - align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 {text - align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img {display:inline!important } .es-button-border {display:block!important } .es-btn-fw {border - width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right {width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header {width:100%!important; max-width:600px!important } .es-adapt-td {display:block!important; width:100%!important } .adapt-img {width:100%!important; height:auto!important } .es-m-p0 {padding:0px!important } .es-m-p0r {padding - right:0px!important } .es-m-p0l {padding - left:0px!important } .es-m-p0t {padding - top:0px!important } .es-m-p0b {padding - bottom:0!important } .es-m-p20b {padding - bottom:20px!important } .es-mobile-hidden, .es-hidden {display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden {width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden {display:table-row!important } table.es-desk-hidden {display:table!important } td.es-desk-menu-hidden {display:table-cell!important } .es-menu td {width:1%!important } table.es-table-not-adapt, .esd-block-html table {width:auto!important } table.es-social {display:inline-block!important } table.es-social td {display:inline-block!important } a.es-button, button.es-button {font - size:14px!important; display:block!important; border-left-width:0px!important; border-right-width:0px!important } }
  
                          </style>
              </head>
              <body style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
                <div class="es-wrapper-color" style="background-color:#FFFFFF">
                  <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top">
                    <tr style="border-collapse:collapse">
                      <td valign="top" style="padding:0;Margin:0">
                        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                          <tr style="border-collapse:collapse">
                            <td style="padding:0;Margin:0;background-color:#FFFFFF" bgcolor="#FFFFFF" align="center">
                              <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px" cellspacing="0" cellpadding="0" bgcolor="#FFFFFF" align="center">
                                <tr style="border-collapse:collapse">
                                  <td style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:40px;background-color:#FFFFFF" bgcolor="#FFFFFF" align="left">
                                    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                      <tr style="border-collapse:collapse">
                                        <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                                          <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:left top" width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                            <tr style="border-collapse:collapse">
                                              <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;font-size:0px"><a target="_blank" href="https://avmbasten.com" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:16px;text-decoration:none;color:#FFFFFF"><img src="https://i.imgur.com/rOjAgPj.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="300"></a></td>
                                              </tr>
                                              <tr style="border-collapse:collapse">
                                                <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px"><h1 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:-apple-system, blinkmacsystemfont, 'segoe ui', roboto, helvetica, arial, sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';font-size:20px;font-style:normal;font-weight:normal;color:#FF6600"><b>CADASTRO - ASTEN CENSO</b></h1></td>
                                              </tr>
                                              <tr style="border-collapse:collapse">
                                                <td align="center" style="padding:0;Margin:0;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:-apple-system, blinkmacsystemfont, 'segoe ui', roboto, helvetica, arial, sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';line-height:24px;color:#000000">Olá, ${data.nome}</p></td>
                                              </tr>
                                              <tr style="border-collapse:collapse">
                                                <td align="center" style="padding:0;Margin:0;padding-right:35px;padding-left:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:-apple-system, blinkmacsystemfont, 'segoe ui', roboto, helvetica, arial, sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';line-height:24px;color:#000000">bem-vindo a plataforma Asten Censo</p></td>
                                              </tr>
                                              <tr style="border-collapse:collapse">
                                                <td align="center" style="padding:0;Margin:0;padding-top:25px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:-apple-system, blinkmacsystemfont, 'segoe ui', roboto, helvetica, arial, sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';line-height:24px;color:#000000">Clique no botão e crie sua senha de acesso, o link expira em 24 horas.</p></td>
                                              </tr>
                                              <tr style="border-collapse:collapse">
                                                <td align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:40px;padding-bottom:40px"><span class="es-button-border es-button-border-2" style="border-style:solid;border-color:#3D5CA3;background:#FF6600;border-width:0px;display:inline-block;border-radius:0px;width:auto"><a href="http://localhost:3000/conta/confirmar/${data.token}" class="es-button es-button-1" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size:14px;color:#FFFFFF;border-style:solid;border-color:#FF6600;border-width:15px 20px 15px 20px;display:inline-block;background:#FF6600;border-radius:0px;font-weight:bold;font-style:normal;line-height:17px;width:auto;text-align:center">CRIAR SENHA DE ACESSO</a></span></td>
                                              </tr>
                                              <tr style="border-collapse:collapse">
                                                <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:11px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:17px;color:#000000">www.astencenso.com.br<br>Um produto AVMB Soluções em TI.<br>Santa Maria – RS<br></p></td>
                                              </tr>
                                              <tr style="border-collapse:collapse">
                                                <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:11px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:17px;color:#000000">Caso não tenha solicitado, desconsidere este contato<br><br><br><br></p></td>
                                              </tr>
                                    </table></td>
                                  </tr>
                                </table></td>
                              </tr>
                            </table></td>
                          </tr>
                        </table></td>
                      </tr>
                    </table>
                    </div>
        </body>
        </html>   
      `
    };
  } 
}