class UsersController < ApplicationController

  before_filter :authenticate_user!, :only => [:welcome]

  def index
    if user_signed_in?
      render :json => format_user
    else
      render :json => {}
    end
  end

  def show
    if user_signed_in?
      render :json => format_user
    else
      render :json => {}
    end
  end

  protected

  def format_user
    { user: current_user }
  end
end
