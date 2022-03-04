const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmailTemplate = async (to, from, templateId, dynamic_template_data) => {
  const msg = {
    to,
    from: { name: 'Somos Más', email: from },
    templateId,
    dynamic_template_data
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('send-grid-error: ', error.toString());
  }
};

module.exports = {
  sendEmailTemplate
};