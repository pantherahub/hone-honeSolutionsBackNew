/**
 * retorna el template basico de envio de correo para tickets
 * @param data : {
        idTickets: any,
        email: string,
        observaciones: string
    }
 * @returns html template string
 */
export const basicTemplate = (data: any) => {
	const template: string = `
            <!DOCTYPE html>
        <html lang='en' xmlns='http://www.w3.org/1999/xhtml' xmlns:o='urn:schemas-microsoft-com:office:office'>

        <head>
            <meta charset='utf-8'>
            <meta name='viewport' content='width=device-width,initial-scale=1'>
            <meta name='x-apple-disable-message-reformatting'>
            <title></title>
            <style>
                table,
                td,
                div,
                h1,
                p {
                    font-family: Arial, sans-serif;
                }
            </style>
        </head>

        <body style='width: 100%; position: relative; display: flex; justify-content: center; text-align: center;
                    '>

            <div role='article' aria-roledescription='email' lang='en' style='text-size-adjust:100%;-webkit-text-size-adjust:100%;
                        -ms-text-size-adjust:100%;
                        background-image: url(https://honesolutions.blob.core.windows.net/email/emailtikets.jpg);
                        background-repeat: no-repeat; background-size: cover;
                    '>
                <table role='presentation' style='width:100%;border:10px;border-spacing:50px; '>
                    <tr>
                        <td style='padding:0;'>
                            <table role='presentation'
                                style='width:98%;max-width:600px;border:none;border-spacing:0;text-align:left;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636; '>

                                <tr>
                                    <td style='padding:20px;background-color:#ffffff00;'>

                                        <div style='padding:0px 0px 0px 0px;text-align:center;'>
                                            <img src='https://honesolutions.blob.core.windows.net/documents/photo5154410902588598764.jpg'
                                                alt=''
                                                style=' width: 160px; position: relative;  margin: 2rem 0; mix-blend-mode: darken;'>
                                        </div>

                                        <p style='margin-top:0;'>
                                            Estimado Cliente.
                                        </p>
                                        <p style='margin:0;'>Queremos darte una cordial bienvenida y
                                            comunicarte que tu radicación ha sido exitosa. &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                        </p>
                                        <br>
                                        <p>
                                            <a>Ticket #${data.idTickets}
                                            </a>&nbsp;
                                        </p>
                                        <br>
                                        <p style='margin:0;'>Perteneciente a: &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                            ${data.email}
                                        </p>
                                        <br>
                                        <p style='margin:0;'>Tener en cuenta las siguientes observaciones:
                                        </p>
                                        <br>
                                        <p style='margin:0;'>${data.observaciones}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </body>

        </html>

    `;
	return template;
};
