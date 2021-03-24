class InterventionsController < ApplicationController


    
  
    def intervention
     
    end
  
    # Method to get buildings related to a selected customer
    def get_building
        #check if customer is passed as parameter
        if params[:customer].present?
            #same thing than : select building_id from customer where customer.id = id  
            @buildings = Customer.find(params[:customer]).buildings
             
        else
            #if non id is given select all the buildings that are refered in the customer table
            @buildings = Customer.all
        end
        
        if request.xhr?
            #if no error 
            #build response 
            respond_to do |format|
                #make a json format for the response 
                format.json {
                    #send the list of corresponding buildings 
                    render json: {buildings: @buildings}
                }
            end
        end
    end

    # Method to get batteries related to a selected building
    def get_battery
        if params[:building].present?
            @batteries = Building.find(params[:building]).batteries
        else
            @batteries = Building.all
        end
        if request.xhr?
            respond_to do |format|
                format.json {
                    render json: {batteries: @batteries}
                }
            end
        end
    end

    # Method to get columnns related to a selected battery
    def get_column
        if params[:battery].present?
            @columns = Battery.find(params[:battery]).columns
        else
            @columns = Battery.all
        end
        if request.xhr?
            respond_to do |format|
                format.json {
                    render json: {columns: @columns}
                }
            end
        end
    end

    # Method to get elevators related to a selected column
    def get_elevator
        if params[:column].present?
            @elevators = Column.find(params[:column]).elevators
        else
            @elevators = Column.all
        end
        if request.xhr?
            respond_to do |format|
                format.json {
                    render json: {elevators: @elevators}
                }
            end
        end
    end
    
  
 
    def new
      @intervention = Intervention.new
    end
    def create
      
        @intervention = Intervention.new()
        p "intervention"
  
          # Rule to avoid an error message if no employee is selected
         
          @employee_fname = Employee.find(params[:employee]).first_name
          @employee_lname = Employee.find(params[:employee]).last_name

          
          # Content from the intervention form
          @intervention.employee_id = params[:employee]
          @intervention.customers_id = params[:customer]
          @intervention.buildings_id = params[:building]
          @intervention.battery_id = params[:battery]
          @intervention.column_id = params[:column]
          @intervention.elevator_id = params[:elevator]
         
          
          
        
         
          if @intervention.save
            redirect_back fallback_location: root_path, notice:"Your intervention was successfully created and sent "
          end 


    
    
    end
 
    def intervention_params
        params.permit( :employee_id, :customer_id, :building_id, :battery_id, :column_id, :elevator_id, :result, :report, :status)
      end

    
  end