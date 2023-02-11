<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShipmentsTable extends Migration
{
  public function up()
  {
    Schema::create('shipments', function (Blueprint $table) {
      $table->id();
      $table->integer('user_id');
      $table->string('waybill');
      $table->string('cname');
      $table->text('caddress');
      $table->string('cphone');
      $table->timestamps();
    });
  }

  public function down()
  {
    Schema::dropIfExists('shipments');
  }
}
