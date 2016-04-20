class Todo < ActiveRecord::Base
  validates :title, :body, presence: true
  validates :done, inclusion: { in: [true, false], allow_nil: true }
  has_many :steps
end
