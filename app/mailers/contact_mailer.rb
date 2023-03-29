class ContactMailer < ApplicationMailer
  def contact_email(contact)
    @contact = contact
    mail(to: 'maelmicout.dev@gmail.com', subject: 'Nouveau message depuis le formulaire de contact')
  end
end

