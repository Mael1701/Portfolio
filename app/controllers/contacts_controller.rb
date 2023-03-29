class ContactsController < ApplicationController
  def new
    @contact = Contact.new
  end

  def create
    @contact = Contact.new(contact_params)

    if @contact.save
      ContactMailer.contact_email(@contact).deliver_now
      flash[:notice] = "Votre message a été envoyé avec succès."
      redirect_to new_contact_path
    else
      flash[:alert] = "Une erreur s'est produite lors de l'envoi de votre message."
      render :new
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:name, :email, :message)
  end

end
