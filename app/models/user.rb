class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  has_many :posts, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_one :profile, dependent: :destroy

  def display_name
    self.username || self.email.split('@').first
  end

  def prepare_profile
    profile || build_profile
  end
end
