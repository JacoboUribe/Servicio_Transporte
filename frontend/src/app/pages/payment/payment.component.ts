import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { PaymentService } from "src/app/services/payment.service";
import { Payment } from "src/app/models/payment.model";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
})
export class PaymentComponent implements OnInit {
  payment: Payment;
  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute, // Importar ActivatedRoute
    private router: Router
  ) {
    this.payment = {
      share_id: 0,
      card_number: "",
      exp_year: "",
      exp_month: "",
      cvc: "",
      name: "",
      last_name: "",
      email: "",
      doc_number: "",
      city: "",
      address: "",
      phone: "",
      cell_phone: "",
    };
  }

  ngOnInit(): void {
    const shareId = Number(this.route.snapshot.paramMap.get("id"));
    this.payment.share_id = shareId; // Asignar el ID al objeto payment
    console.log("share ID capturado:", shareId); // Comprobación en consola
  }

  loading: boolean = false; // Indicador de carga

  create() {
    this.loading = true; // Activa el indicador de carga
    console.log(JSON.stringify(this.payment));
    this.paymentService.create(this.payment).subscribe({
      next: (data) => {
        this.loading = false; // Desactiva el indicador de carga
        Swal.fire("PAGO EXITOSO", "Se realizó el pago exitosamente", "success");
        this.router.navigate(["shares/list"]);
      },
      error: (err) => {
        this.loading = false; // Desactiva el indicador en caso de error
        Swal.fire("ERROR", "Hubo un problema al procesar el pago", "error");
        console.error(err);
      },
  });
  }
}