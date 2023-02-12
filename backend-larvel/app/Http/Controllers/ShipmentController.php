<?php

namespace App\Http\Controllers;

use Auth;
use Validator;
use App\Models\Shipment;
use Illuminate\Http\Request;

class ShipmentController extends Controller
{
  public function upload($waybill)
  {
    // upload waybill file to server
    $waybillName = date('YmdHi') . $waybill->getClientOriginalName();
    $waybill->move(public_path('/waybills'), $waybillName);
    return asset('waybills/' . $waybillName);
  }
  public function validateData(Request $request)
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
  }

  public function checkAutho($result, $userId)
  {
    if (!$result[0] && $result->user_id !== $userId) {
      return response()->json(['error' => 'Unauthorized'], 401);
    }
  }

  public function add(Request $request)
  {
    $valRes = $this->validateData($request);
    if ($valRes?->status() == 400) {
      return $valRes;
    }
    $waybillUrl = $this->upload($request->waybill);

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

  public function update(Request $request)
  {
    $userId = auth()->user()->id;
    $shipment = Shipment::find($request->id);
    if ($shipment === null) {
      return response()->json(['error' => ['Not found']], 404);
    }

    $authoRes = $this->checkAutho($shipment, $userId);
    if ($authoRes?->status() == 401) {
      return $authoRes;
    }

    $waybillUrl = $request->waybill;

    $valRes = $this->validateData($request);
    if ($valRes?->status() == 400) {
      return $valRes;
    }

    // checks if the waybill has been updated from its type (url or file)
    $waybillUrl = filter_var($waybillUrl, FILTER_VALIDATE_URL) ? $waybillUrl : $this->upload($waybillUrl);

    $shipment->update([
      'waybill' => $waybillUrl ? $waybillUrl : $request->waybill,
      'cname' => $request->cname,
      'caddress' => $request->caddress,
      'cphone' => $request->cphone,
    ]);

    return response()->json([
      'statusMsg' => 'Update successful',
    ], 200);
  }

  public function get($id = null)
  {
    $userId = auth()->user()->id;
    $result = $id ? Shipment::find($id) : Shipment::where('user_id', $userId)->get();

    $authoRes = $this->checkAutho($result, $userId);
    if ($authoRes?->status() == 401) {
      return $authoRes;
    }

    return response()->json([
      'statusMsg' => 'Get successful',
      'result' => $result
    ], 200);
  }

  public function delete($id)
  {
    $userId = auth()->user()->id;

    $shipment = Shipment::find($id);
    if ($shipment === null) {
      return response()->json(['error' => ['Not found']], 404);
    }

    $authoRes = $this->checkAutho($shipment, $userId);
    if ($authoRes?->status() == 401) {
      return $authoRes;
    }

    $shipment->delete();

    return response()->json([
      'statusMsg' => 'Delete successful',
    ], 200);
  }
}