class AddGoogleMapToAddresses < ActiveRecord::Migration[5.2]
  def change
    add_column :addresses, :google_map, :text
  end
end
