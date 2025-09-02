class AddBodyToTemplate < ActiveRecord::Migration[8.0]
  def change
    add_column :templates, :body, :string
  end
end
