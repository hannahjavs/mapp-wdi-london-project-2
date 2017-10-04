const Plan = require('../models/plan');
const nodemailer = require('nodemailer');
const path = require('path');
const async = require('async');
const EmailTemplate = require('email-templates').EmailTemplate;
const inviteTemplate = path.join(__dirname, '..', 'templates', 'invite');
const { url } = require('../config/environment');
const locals = { url };

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'willhandanapp@gmail.com',
    pass: process.env.PLANAPP_GMAIL_PASSWORD
  }
});

function findPlan(req, res, next) {
  Plan
    .findById(req.params.id)
    .populate('createdBy')
    .exec()
    .then(plan => {
      if(!plan) return res.notFound();
      locals.plan = plan;

      sendInvites();
      return res.end();
    })
    .catch(next);
}

function sendInvites() {
  async.each(locals.plan.guests, sendInvite, handleError);
}

function sendInvite(guest, next) {
  const invite = new EmailTemplate(inviteTemplate);
  // if the guest has already been invited (email previously sent) don't resend email
  if(guest.invited) return false;

  // attaching a single guest object to the locals object to be passed into the email-templates rendering engine
  locals.guest = guest;
  invite.render(locals, (err, result) => {
    if (err) return next(err);

    transporter.sendMail({
      from: '"Plan App 🎸" <willhandanapp@gmail.com>',
      to: locals.guest.email,
      subject: `${locals.guest.name}, you're invited!`,
      html: result.html,
      text: result.text
    }, (err) => {
      if (err) return handleError(err);
      console.log(`Email sent to ${guest.name}`);
      updateUser(guest);
    });

  });
}

function updateUser(guest) {
  Plan
    .findById(locals.plan.id)
    .exec()
    .then(plan => {
      if(!plan) return false;

      const guestToUpdate = plan.guests.id(guest.id);
      guestToUpdate.invited = true;
      return plan.save();
    });
}

function handleError(err) {
  console.log('err:', err);
}

module.exports = {
  send: findPlan
};
