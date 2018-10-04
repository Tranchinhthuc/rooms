# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
City.destroy_all
District.destroy_all
Room.destroy_all
Contract.destroy_all

User.create(
  name: 'Admin',
  role: :admin,
  email: 'admin@gmail.com',
  username: 'admin',
  password: '12341234'
)

City.create(name: 'Hà Nội')
puts 'Created City'

10.times do |i|
  district = District.create(name: "Quận #{i + 1}", city_id: City.first.id)
  10.times do |j|
    district.communes.create(name: "Xã #{i + 1}-#{j+1}")
  end
end
district_ids = District.all.map(&:id)
commune_ids = Commune.all.map(&:id)
puts 'Created District'

puts 'Creating...(owners, tenants, rooms)'
20.times do |i|
  owner = User.create(
    name: "Owner_#{i+1}",
    role: :owner,
    email: "owner_#{i+1}@gmail.com",
    username: "owner_#{i}",
    password: '12341234'
  )

  10.times do |j|
    Room.create(
      name: "#{i + 1}0#{j + 1}",
      owner_id: owner.id,
      size: (20..40).to_a.sample,
      price: ['2000k', '2200k', '2400k', '2600k'].sample,
      elictrical_price: ['2500', '3000', '3500', '4000'].sample,
      water_price: ['15k', '20k', '25k', '30'].sample,
      district_id: district_ids.sample,
      commune_id: commune_ids.sample,
      status: [:available, :full, :leave_in_one_month].sample
    )

    User.create(
      name: "Tenant_#{i+1}",
      role: :tenant,
      email: "tenant_#{i+1}@gmail.com",
      username: "tenant_#{i}",
      password: '12341234'
    )
  end
end
puts 'Created owners, tenants, rooms'

tenant_ids = User.tenant.map(&:id)
room_ids = Room.all.map(&:id)
full_room_ids = []

tenant_ids.first(150).each do |tenant_id|
  room_id = (room_ids - full_room_ids).sample
  full_room_ids << room_id
  signed_date = Time.zone.today + (-4..4).to_a.sample.months + (1..30).to_a.sample.days
  expired_date = signed_date + [3, 6, 9, 12].sample.months
  cancelled_date = signed_date - [1, 2].sample.months
  Contract.create(
    tenant_id: tenant_id,
    room_id: room_id,
    signed_date: signed_date,
    expired_date: expired_date,
    cancelled_date: cancelled_date,
    status: :active
  )
end
puts 'Created contracts'
