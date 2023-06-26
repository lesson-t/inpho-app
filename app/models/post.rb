class Post < ApplicationRecord
    belongs_to :user
    has_many :likes, dependent: :destroy
    has_many_attached :images

    def display_created_at
        I18n.l(self.created_at, format: :default)
    end

    def author_name
        user.display_name
    end

end
