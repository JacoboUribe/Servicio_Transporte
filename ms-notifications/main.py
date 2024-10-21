import os
import smtplib
from contextlib import nullcontext
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from flask import Flask, request,jsonify
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

#funciona para enviar correos
def send_email(subject, recipient_email, body_html):
    email_sender = os.getenv('GoogleMail_EmailSender')
    email_password = os.getenv('GoogleMail_Apikey')
    smtp_port = os.getenv('GoogleMail_Port')
    smtp_server = os.getenv('GoogleMail_Host')

    print(f'Email sender: {email_sender}')
    print(f'Email password: {email_password}')
    print(f'SMTP server: {smtp_server}')
    print(f'SMTP port: {smtp_port}')

    #crear mensaje
    msg = MIMEMultipart()
    msg['From'] = email_sender
    msg['To'] = recipient_email
    msg['Subject'] = subject

    #agregar el cuerpo del mensaje en formato html
    msg.attach(MIMEText(body_html, 'html'))

    try:
        #conectar al servidor SMTP y enviar correo
        with smtplib.SMTP(smtp_server, int(smtp_port)) as server:
            server.starttls()
            server.login(email_sender, email_password)
            server.sendmail(email_sender, recipient_email, msg.as_string())

        return True
    except Exception as e:
        return False, str(e)

@app.route('/send-email', methods=['POST'])
def send_email_endpoint():
    data = request.json
    subject = data.get('subject')
    recipient = data.get('recipient')
    body_html = data.get('body_html')

    success = send_email(subject, recipient, body_html)
    print(f'success: {success}')
    if success:
        print('Email sent successfully')
        return jsonify({'message': 'Email send successfully'})
    else:
        print(f'Failed to send email')
        return jsonify({'error': f'failed to send email'})

if __name__ == '__main__':
    app.run(debug=True)