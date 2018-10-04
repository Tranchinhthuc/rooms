class Host::ContractsController < HostBaseController
  def index
    @contracts = Contract.all
    # .page(params[:page])
  end

  def show
    @contract = Contract.find(params[:id])
  end

  def new
    @contract = Contract.new
  end

  def create
    @contract = Contract.new(contract_params)
    if @contract.save
      redirect_to host_contracts_path
    else
      render :new
    end
  end

  def edit
    @contract = Contract.find(params[:id])
  end

  def update
    @contract = Contract.find(params[:id])
    if @contract.update_attributes(contract_params)
      redirect_to host_contracts_path
    else
      render :edit
    end
  end

  def destroy
    @contract = Contract.find(params[:id])
    @contract.destroy
    redirect_to contracts_path
  end

  private

  def contract_params
    params.require(:contract).permit(
      :signed_date,
      :expired_date,
      :cancelled_date,
      :room_id,
      :tenant_id,
      :status
    )
  end
end
