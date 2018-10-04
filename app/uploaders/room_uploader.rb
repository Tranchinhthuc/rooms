# require 'carrierwave/processing/mime_types'

class RoomUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick
  # include CarrierWave::MimeTypes
  # process :set_content_type

  # before :cache, :capture_size_before_cache # callback, example here: http://goo.gl/9VGHI
  # def capture_size_before_cache(new_file)
  #   if model.image_upload_width.nil? || model.image_upload_height.nil?
  #     model.image_upload_width, model.image_upload_height = `identify -format "%wx %h" #{new_file.path}`.split(/x/).map(&:to_i)
  #   end
  # end

  version :eyecatch do
    process resize_to_fill: [125, 125]
  end

  version :cover do
    process resize_to_fill: [190, 190]
  end

  version :jumbotron do
    process resize_to_fill: [600, 400]
  end

  # version :jumbotron_lower do
  #   process resize_to_fill: [600, 327]
  # end

  # version :jumbotron_x_lower do
  #   process resize_to_fill: [600, 300]
  # end

  # version :jumbotron_quater do
  #   process resize_to_fill: [600, 200]
  # end

  # version :sns do
  #   process resize_to_fill: [1200, 610]
  # end

  if Rails.env.production? || Rails.env.staging?
    storage :fog
  else
    storage :file
  end

  def store_dir
    "uploads/fund/#{mounted_as}/#{model.id}/"
  end

  def extension_whitelist
    %w(jpg png jpeg)
  end

  def size_range
    0..10.megabytes
  end

  def filename
    if original_filename && original_filename == @filename
      "#{secure_token}.#{file.extension}"
    else
      @filename
    end
  end

  protected

  def secure_token
    var = :"@#{mounted_as}_secure_token"
    model.instance_variable_get(var) || model.instance_variable_set(var, SecureRandom.uuid)
  end
end
