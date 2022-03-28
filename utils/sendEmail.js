const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmailTemplate = async (to, from, templateId, dynamic_template_data) => { // eslint-disable-line
  const msg = {
    to,
    from: { name: 'Somos Más', email: from },
    templateId,
    dynamic_template_data, // eslint-disable-line
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    return { 'send-grid-error: ': error.message };
  }
};

module.exports = {
  sendEmailTemplate,
};
