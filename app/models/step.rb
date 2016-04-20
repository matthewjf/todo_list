class Step < ActiveRecord::Base
  belongs_to :todo
  validates :todo, :description, presence: true

end
