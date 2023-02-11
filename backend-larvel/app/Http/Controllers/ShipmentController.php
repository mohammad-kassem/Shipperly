<?php

namespace App\Http\Controllers;

use Auth;
use Validator;
use App\Models\Shipment;
use Illuminate\Http\Request;

class ShipmentController extends Controller
{
  public function add(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'waybill' => 'required',
      'cname' => 'required|string|min:6|max:255',
      'caddress' => 'required|string|min:6',
      'cphone' => ([
        'required',
        // validate phone number with international code... 
        // working example: +961688688
        'regex:/(^\+(9[976]\d|8[987530]\d|6[987]
        \d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]
        |6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{6,14}$)/'
      ])
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
    }

    // upload waybill file to server
    $waybill = $request->waybill;
    $waybillName = date('YmdHi') . $waybill->getClientOriginalName();
    $waybill->move(public_path('/waybills'), $waybillName);
    $waybillUrl = asset('waybills/' . $waybillName);

    $userId = auth()->user()->id;

    Shipment::create([
      'user_id' => $userId,
      'waybill' => $waybillUrl,
      'cname' => $request->cname,
      'caddress' => $request->caddress,
      'cphone' => $request->cphone,
    ]);

    return response()->json([
      'statusMsg' => 'Add successful',
    ], 200);
  }
}