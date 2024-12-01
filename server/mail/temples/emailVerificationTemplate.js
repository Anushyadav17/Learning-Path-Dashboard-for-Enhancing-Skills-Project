const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
	<html lang="en">
	
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>OTP Verification Email</title>
		<style>
			body {
				background-color: #f3f4f6;
				font-family: 'Helvetica Neue', Arial, sans-serif;
				font-size: 16px;
				color: #2d3748;
				margin: 0;
				padding: 0;
				line-height: 1.5;
			}
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 40px;
				background-color: #ffffff;
				border-radius: 8px;
				box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
				text-align: center;
			}
			.logo {
				width: 150px;
				margin-bottom: 30px;
			}
			.message {
				font-size: 20px;
				font-weight: 600;
				color: #1a202c;
				margin-bottom: 20px;
			}
			.body-text {
				font-size: 16px;
				color: #4a5568;
				margin-bottom: 30px;
			}
			.otp {
				display: inline-block;
				font-size: 28px;
				color: #3182ce;
				font-weight: bold;
				margin: 10px 0;
				padding: 12px 24px;
				border-radius: 8px;
				background-color: #ebf4ff;
			}
			.cta {
				display: inline-block;
				margin-top: 20px;
				padding: 12px 24px;
				background-color: #48bb78;
				color: #ffffff;
				text-decoration: none;
				font-size: 16px;
				font-weight: bold;
				border-radius: 8px;
			}
			.support {
				margin-top: 30px;
				font-size: 14px;
				color: #718096;
			}
			.support a {
				color: #3182ce;
				text-decoration: none;
			}
		</style>
	</head>
	
	<body>
		<div class="container">
			<div class="message">OTP Verification</div>
			<div class="body-text">
				<p>Hello,</p>
				<p>Thank you for registering with us! To complete your registration, please use the OTP code below:</p>
			</div>
			<div class="otp">${otp}</div>
			<div class="body-text">
				<p>This OTP is valid for 5 minutes. If you did not request this verification, please ignore this email.</p>
				<p>Once verified, you’ll have access to our platform and all its features.</p>
			</div>
			<a href="#" class="cta">Visit Our Platform</a>
			<div class="support">
				<p>Need help? Contact us at <a href="mailto:info@studywebsite.com">info@studywebsite.com</a>.</p>
			</div>
		</div>
	</body>
	
	</html>`;
};

module.exports = otpTemplate;
