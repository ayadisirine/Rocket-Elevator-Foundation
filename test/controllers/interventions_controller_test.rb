require 'test_helper'

class InterventionsControllerTest < ActionDispatch::IntegrationTest
  test "should get intervention" do
    get interventions_intervention_url
    assert_response :success
  end

end
