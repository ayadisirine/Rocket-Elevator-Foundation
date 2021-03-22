class CreateInterventions < ActiveRecord::Migration[5.2]
  def change
    create_table :interventions do |t|
      t.integer :battery_id , null: true
      t.integer :column_id
      t.integer :elevator_id
      t.integer :employee_id
      t.datetime :start_intervention, default:nil
      t.datetime :end_intervention, default:nil 
      t.string :Result, :default => 'Incomplete'
      t.string :Report
      t.string :Status, :default => 'Pending'
      t.timestamps 
    end
  end
end
